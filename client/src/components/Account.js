import { useContext } from "react"
import { Context } from "../context"
import Order from "./Order"

export default function Account() {
    const user = useContext(Context)

    const orders = user.orders

    return (
        <Context.Consumer>
        {user => 
        <div className="flex flex-col m-5 gap-2">
            <h2>{user.first_name}'s Order History</h2>
            {orders ? <div className="rounded grid grid-template-row-auto-1fr shadow-lg cursor-default max-w-full pt-4">
            {user.orders.map((order) => (
                <Order 
                key={order.id}
                paypal_id={order.paypal_id}
                total_cost={order.total_cost}
                created_at={order.created_at}
                products={order.products} />
                ))}
            </div> : <p>No orders placed - time to get shopping!</p>}
        </div>
        }
        </Context.Consumer>
    )
}