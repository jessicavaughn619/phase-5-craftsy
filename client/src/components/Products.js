import ProductCard from "./ProductCard"

export default function Products({ products }) {

    const allProducts = products.map((product) => (
        <ProductCard 
        key={product.id}
        product={product}
        />
    ))
    return (
        <div className="grid grid-flow-col gap-4">
            {allProducts}
        </div>
    )
}