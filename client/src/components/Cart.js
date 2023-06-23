export default function Cart({ products }) {
    console.log(products)
    
    return (
        <div className="m-5">
            {products ?
            products.map(product => (
                <li>{product.item}</li>
            ))
            : <p>You have no products in your cart!</p>
            }
        </div>
    )
}