import ProductCard from "./ProductCard"

export default function Products({ products, productsInCart, onSetProductsInCart, onSetMessage }) {

    const allProducts = products.map((product) => (
        <ProductCard 
        key={product.id}
        product={product}
        onSetProductsInCart={onSetProductsInCart}
        productsInCart={productsInCart}
        onSetMessage={onSetMessage}
        />
    ))
    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
            {allProducts}
        </div>
    )
}