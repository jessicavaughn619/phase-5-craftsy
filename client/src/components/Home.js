import Products from "./Products"

export default function Home({ products, productsInCart, onSetProductsInCart }) {

    return (
        <div className="m-5 mt-0">
                <Products 
                    onSetProductsInCart={onSetProductsInCart}
                    products={products}
                    productsInCart={productsInCart}
                />
        </div>
    )

}