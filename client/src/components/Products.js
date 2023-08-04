import ProductCard from "./ProductCard"

export default function Products({ products, productsInCart, onSetProductsInCart, onSetMessage, addMessage }) {

    const allProducts = products.map((product) => (
        <ProductCard 
        key={product.id}
        product={product}
        onSetProductsInCart={onSetProductsInCart}
        productsInCart={productsInCart}
        onSetMessage={onSetMessage}
        addMessage={addMessage}
        />
    ))
    return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
            {allProducts}
        </div>
    )
}