import Products from "./Products"

export default function Home({ products, onSetProductsInCart }) {

    return (
        <div className="m-5 mt-0">
                <Products 
                    onSetProductsInCart={onSetProductsInCart}
                    products={products}
                />
        </div>
    )

}