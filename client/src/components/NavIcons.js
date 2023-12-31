import { NavLink } from 'react-router-dom';
import { BsFillCartCheckFill } from "react-icons/bs"
import { BiSolidUserCircle } from "react-icons/bi"
import { Context } from '../context';

export default function NavIcons({productsInCart}) {

    function totalItems(productsInCart) {
        let totalItems = 0;
        for (let i = 0; i < productsInCart.length; i++) {
            const product = productsInCart[i]
            const quantity = product.quantity_in_cart || 0;
            totalItems += quantity;
        }
        return totalItems;
        }
    
    const totalItemsInCart = totalItems(productsInCart)

    return (
        <Context.Consumer>
        {user => 
        <div className="flex absolute right-0 pl-5 space-x-4 mr-5">
            <NavLink to="/account" className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "text-amber-600 text-xl" : "hover:text-amber-600 text-xl"}>
                <BiSolidUserCircle className="text-3xl" />
            </NavLink>
            <NavLink to="/cart" className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "text-amber-600 text-xl" : "hover:text-amber-600 text-xl"}>
                <div className="flex flex-row space-x-1 items-center">
                <BsFillCartCheckFill className="text-3xl" />
                <span className="text-sm mt-1">({totalItemsInCart})</span>
                </div></NavLink>
        </div>
        }
        </Context.Consumer>
    )
}