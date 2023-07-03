import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import CartCard from "./CartCard"

export default function Cart({ products, onDeleteItem, onUpdateQuantityInCart }) {

  function totalOrderCost(products) {
    let totalCost = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      const price = product.price || 0;
      const quantity = product.quantity_in_cart || 0;
      totalCost += price * quantity;
    }
    return totalCost;
  }

  const totalCost = totalOrderCost(products)

    const createOrder = (data) => {
        // Order is created on the server and the order id is returned
        return fetch("/create-paypal-order", {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
          // use the "body" param to optionally pass additional order information
          // like product skus and quantities
          body: JSON.stringify(products),
        })
        .then((response) => response.json())
        .then((order) => order.id);
      }
      const onApprove = (data) => {
         // Order is captured on the server
         return fetch("/capture-paypal-order", {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderID: data.orderID
          })
        })
        .then((response) => response.json());
      }
    
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
    return (
        <div className="flex flex-col">
        <div className="m-5">
            {cartItems ?
            cartItems
            : <p>You have no products in your cart!</p>
            }
        </div>
        <div className="m-5">
          <p>Order Total: ${totalCost}</p>
        </div>
        <div className="flex flex-col items-center">
        <PayPalScriptProvider options={{
            "client-id": 
            "AXmdt024Q6sKUwG88HayNtol9x5fLiFOQzLOkS1Q87iBiKP98mCWF5_HVibYMVAIIUv7YmYoRHATOZRU"
            }}>
            <PayPalButtons
        createOrder={(data) => createOrder(data)}
        onApprove={(data) => onApprove(data)}
            />
        </PayPalScriptProvider>
        </div>
        </div>
    )
}