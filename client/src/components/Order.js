import OrderCard from "./OrderCard"

export default function Order({paypal_id, total_cost, created_at, products}) {

    const dateString = String(created_at)
    const dateObject = newDate(dateString)

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDataString('en-US', options);

    

    return (
        <div className="flex flex-col p-5 gap-2">
        <span>Order Placed: {formattedDate}</span>
            <div className="flex justify-between">
                <span>Order ID: {paypal_id}</span>
                <span>Total Cost: ${total_cost.toFixed(2)}</span>
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