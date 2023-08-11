import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useContext } from "react";
import { Context } from '../context';
import CartCard from "./CartCard"
import Button from "./Button";

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

  function handleSuccessfulOrder(order) {
    setOrderPlaced(true)
    onEmptyCart(products)
    console.log(order)
  }

  function handleCreateOrder(products, orderId, totalCost) {
    const cost = parseInt(totalCost)

    fetch("/api/orders", {
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
        .then((order) => handleSuccessfulOrder(order))
      } else {
        r.json().then((err) => setErrors(err));
      }
    });
  }

    return (
      <Context.Consumer>
        {user => 
        <div className="flex flex-col m-5">
          {orderPlaced ? <div className="flex justify-center mb-5">
            <span className="text-xl">Thank you for your order, {user.first_name}!</span>
          </div> : null}
            {user && cartItems ?
            <div className="space-y-4 mb-4">
            {cartItems}
              <div className="flex space-x-2">
                <p className="font-semibold">Order Total:</p>
                <p>${totalCost}</p>
              </div>
            </div>
            : user && !orderPlaced ? <div className="space-y-4">
            <p>You have no products in your cart! Let's start shopping!</p></div>
            : <div className="space-y-4"><p>Login or sign up to start shopping!</p></div>}
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
            /> : cartItems && user ? 
            <Button onClick={() => setCheckout(true)} children={"Checkout"}></Button>
            : null}
        </div>
        <div className="text-amber-600">
            {errors.error}
          </div>
        </div>
        }
        </Context.Consumer>
    )
}