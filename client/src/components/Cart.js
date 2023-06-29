import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import CartCard from "./CartCard"

export default function Cart({ products, onDeleteItem }) {
    const createOrder = (data) => {
        // Order is created on the server and the order id is returned
        return fetch("/create-paypal-order", {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
          },
          // use the "body" param to optionally pass additional order information
          // like product skus and quantities
          body: JSON.stringify({
            cart: [
              {
                sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                quantity: "YOUR_PRODUCT_QUANTITY",
              },
            ],
          }),
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
            onDeleteItem={onDeleteItem}/>
        ))
        }
        else {
            cartItems = null
        }
    return (
        <div>
        <div>
            {cartItems ?
            cartItems
            : <p>You have no products in your cart!</p>
            }
        </div>
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
    )
}