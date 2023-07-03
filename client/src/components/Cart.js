import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useContext } from "react";
import { Context } from '../context';
import CartCard from "./CartCard"
import ButtonSec from "./ButtonSec";

export default function Cart({ products, onDeleteItem, onUpdateQuantityInCart, onEmptyCart }) {
  const user = useContext(Context)
  const [checkout, setCheckout] = useState(false)
  const [errors, setErrors] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false)

  function totalOrderCost(products) {
    let totalCost = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      const price = product.price || 0;
      const quantity = product.quantity_in_cart || 0;
      totalCost += price * quantity;
    }
    return totalCost.toFixed(2);
  }

  const totalCost = totalOrderCost(products)

    let cartItems;
    if ((products.length) > 0) {
        cartItems = products.map(product => (
            <CartCard 
            key={product.id}
            product={product}
            onDeleteItem={onDeleteItem}
            onUpdateQuantityInCart={onUpdateQuantityInCart}/>
        ))
        }
        else {
            cartItems = null
        }

  function handleSuccessfulOrder() {
    setOrderPlaced(true)
    onEmptyCart(products)
  }

  function handleCreateOrder(products, orderId, totalCost) {
    const cost = parseInt(totalCost)
    fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        paypal_id: orderId,
        products: products,
        user_id: user.id,
        total_cost: cost
      }),
    }).then((r) => {
      if (r.ok) {
        r.json()
        .then(handleSuccessfulOrder())
      } else {
        r.json().then((err) => setErrors(err));
      }
    });
  }

    return (
      <Context.Consumer>
        {user => 
        <div className="flex flex-col">
        <div className="m-5">
          {orderPlaced ? <div className="flex justify-center mb-5">
            <span className="text-xl">Thank you for your order, {user.first_name}!</span>
          </div> : null}
            {cartItems ?
            <div>
            {cartItems}
              <div className="m-5">
                <p>Order Total: ${totalCost}</p>
              </div>
            </div>
            : <p>You have no products in your cart!</p>
            }
        </div>
        <div className="grid place-items-center">
          {checkout && cartItems ? 
        <PayPalButtons
        style={
          {color: 'silver',
          shape: "pill"}
        }
         createOrder={(data, actions) => {
          return actions.order
          .create({
              purchase_units: [
                  {
                    amount: {
                        value: totalCost,
                      },
                  },
              ],
          })
      }}
      onApprove={(data, actions) => {
          return actions.order
          .capture()
          .then((details) => {
              const orderId = details.id
              handleCreateOrder(products, orderId, totalCost);
          })
      }}
            /> : cartItems ? <ButtonSec onClick={() => setCheckout(true)} children={"Checkout"}></ButtonSec> : null }
        </div>
        <div className="text-amber-600">
            {errors.error}
          </div>
        </div>
        }
        </Context.Consumer>
    )
}