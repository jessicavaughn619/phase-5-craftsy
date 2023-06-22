import { Link } from "react-router-dom"
import Products from "./Products"
import { BsCartCheck } from "react-icons/bs"

export default function Home({ user, products }) {
    return (
        <div className="m-5 mt-0">
            <div>
            <div className="flex justify-between mb-5">
                {user ? 
                <p>Welcome, {(user.name) ? user.name : user.first_name}!</p> :
                <p>Check out our site!</p>}
                <div>
                <Link to="/cart"><BsCartCheck className="text-gray-700 text-base hover:cursor-pointer hover:text-amber-600"/></Link>
                </div>
            </div>
                <Products products={products}/>
            </div>
        </div>
    )

}