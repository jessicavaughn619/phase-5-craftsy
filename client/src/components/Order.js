import OrderCard from "./OrderCard"

export default function Order({paypal_id, total_cost, created_at, products}) {

    console.log(products)

    return (
        <div className="flex flex-col p-5 gap-2">
        <span>Order Placed: {created_at}</span>
            <div className="flex justify-between">
                <span>Order ID: {paypal_id}</span>
                <span>Total Cost: {total_cost}</span>
            </div>
        <span>Products: </span>
        <div>
        {products.map((product) => (
        <OrderCard
            key={product.id}
            item={product.item}
            price={product.price}
            quantity={product.quantity}
            />
    ))}
    </div>
    </div>
    )
}