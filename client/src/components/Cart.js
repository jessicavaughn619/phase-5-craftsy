import CartCard from "./CartCard"

export default function Cart({ products }) {

    const cartItems = products.map(product => (
        <CartCard 
        key={product.id}
        product={product}/>
    ))
    return (
        <div className="grid grid-flow-col gap-4">
            {products ?
            cartItems
            : <p>You have no products in your cart!</p>
            }
        </div>
    )
}