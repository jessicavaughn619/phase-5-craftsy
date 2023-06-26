import CartCard from "./CartCard"

export default function Cart({ products, onDeleteItem }) {
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
        <div className="ml-5 grid grid-rows-3 grid-flow-col gap-4">
            {cartItems ?
            cartItems
            : <p>You have no products in your cart!</p>
            }
        </div>
    )
}