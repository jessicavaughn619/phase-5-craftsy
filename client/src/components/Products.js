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
        <div className="grid justify-center grid-cols-cust-1 gap-4 sm:grid-cols-cust-2 lg:grid-cols-cust-3 xl:grid-cols-cust-4">
            {allProducts}
        </div>
    )
}