import ProductCard from "./ProductCard"

export default function Products({ products, productsInCart, onSetProductsInCart }) {

    const allProducts = products.map((product) => (
        <ProductCard 
        key={product.id}
        product={product}
        onSetProductsInCart={onSetProductsInCart}
        productsInCart={productsInCart}
        />
    ))
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4">
            {allProducts}
        </div>
    )
}