import ProductCard from "./ProductCard"
import { useEffect } from "react"

export default function Products({ products, productsInCart, onSetProductsInCart, onSetMessage }) {

    useEffect(() => {
        const fetchData = async () => {
          try {
            const check_session_response = await fetch("/api/");
            if (check_session_response.ok) {
              const user = await check_session_response.json();
              setUser(user);
            }
          } catch (error) {
            console.log(error)
          }
        }
        fetchData()
      }, []);

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
        <div className="grid grid-cols-3 gap-4">
            {allProducts}
        </div>
    )
}