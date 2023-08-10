import Products from "./Products"

export default function Home({ products, productsInCart, onSetProductsInCart, search }) {

const filteredProducts = products.filter(product => 
    (product.name.toLowerCase().includes(search.toLowerCase())) ||
    (product.description.toLowerCase().includes(search.toLowerCase()))
)

    return (
        <div className="m-5 mt-0">
                <Products 
                    onSetProductsInCart={onSetProductsInCart}
                    products={filteredProducts}
                    productsInCart={productsInCart}
                />
        </div>
    )

}