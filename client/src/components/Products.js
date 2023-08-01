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
        <div className="grid grid-rows-3 gap-4">
            {allProducts}
        </div>
    )
}