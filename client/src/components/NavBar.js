import { useNavigate, NavLink } from 'react-router-dom';
import { BsCartCheck } from "react-icons/bs"
import { Context } from '../context';

export default function NavBar({ onSetUser, message, onSetMessage, productsInCart, onSetProductsInCart }) {
    const navigate = useNavigate()

    function handleLogoutClick() {
        fetch("/api/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              onSetUser(null);
              onSetMessage("Logged out!")
              onSetProductsInCart(productsInCart)
              navigate("/")
            }
          });
        }

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
        {user => <nav className="m-5 pb-4">
            {user ? 
            <div className="flex">
                <div className="flex flex-col sm:flex-row sm:space-x-5">
                <NavLink to="/" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Products</NavLink>
                <NavLink to="/about" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>About</NavLink>
                <NavLink to="/contact" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Contact</NavLink>
                </div>
                <div className="flex absolute right-0 pr-10 flex-col items-end sm:flex-row sm:space-x-5">
                    <p className="italic">Welcome, {user.first_name}</p>
                    <button onClick={handleLogoutClick} className="hover:text-amber-600">Logout</button>
                </div>
            </div> : 
            <div className="flex">
                <div className="flex flex-col sm:flex-row sm:space-x-5">
                <NavLink to="/" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Products</NavLink>
                <NavLink to="/about" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>About</NavLink>
                <NavLink to="/contact" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Contact</NavLink>
                </div>
                <div className="flex absolute right-0 pr-10 flex-col items-end sm:flex-row sm:space-x-5">
                    <NavLink to='/signup' className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Sign Up</NavLink>
                    <NavLink to='/login' className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Login</NavLink>
                </div>
            </div>}
            <div className="flex absolute right-0 space-x-5 mr-10 ml-10 sm:mt-2">
                <span className="text-amber-600">{message}</span>
                <NavLink to="/cart" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600 text-xl" : "hover:text-amber-600 text-xl"}>
                    <div className="flex flex-row space-x-2">
                    <BsCartCheck />
                    ({totalItemsInCart})
                    </div></NavLink>
            </div>
        </nav>
        }
        </Context.Consumer>
    )
}