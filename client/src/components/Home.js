import Products from "./Products"

export default function Home({ products, productsInCart, onSetProductsInCart, onSetMessage, addMessage }) {

    return (
        <div className="m-5 mt-0">
                <Products 
                    onSetProductsInCart={onSetProductsInCart}
                    products={products}
                    productsInCart={productsInCart}
                    onSetMessage={onSetMessage}
                    addMessage={addMessage}
                />
        </div>
    )

}