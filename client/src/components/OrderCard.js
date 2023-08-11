export default function OrderCard({item, price, quantity}) {
    return (
        <div className="flex justify-between">
        <span>Item: {item}</span>
        <span>Price: ${price.toFixed(2)}</span>
        <span>Quantity: {quantity}</span>
        </div>
    )
}