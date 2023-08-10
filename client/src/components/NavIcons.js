import { NavLink } from 'react-router-dom';
import { BsCartCheck } from "react-icons/bs"
import { Context } from '../context';

export default function NavIcons({message, productsInCart}) {

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
        <div className="flex absolute right-0 space-x-5 mr-10 ml-10 sm:mt-2">
            <span className="text-amber-600">{message}</span>
            <NavLink to="/cart" className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "text-amber-600 text-xl" : "hover:text-amber-600 text-xl"}>
                <div className="flex flex-row space-x-2 items-center">
                <BsCartCheck />
                <span className="text-sm">({totalItemsInCart})</span>
                </div></NavLink>
        </div>
        }
        </Context.Consumer>
    )
}