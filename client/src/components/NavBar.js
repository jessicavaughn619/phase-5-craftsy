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

    return (
        <Context.Consumer>
        {user => <nav className="m-10 pb-4">
            {user ? 
            <div className="flex">
                <div className="flex flex-col space-x-2 sm:space-x-5 sm:flex-row">
                <NavLink to="/" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Products</NavLink>
                    <span>|</span>
                <NavLink to="/about" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>About</NavLink>
                    <span>|</span>
                <NavLink to="/contact" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Contact</NavLink>
                </div>
                <div className="flex absolute right-0 pr-10 flex-col space-x-2 sm:space-x-5 sm:flex-row">
                    <p className="italic">Welcome, {user.first_name}</p>
                    <span>|</span>
                    <button onClick={handleLogoutClick} className="hover:text-amber-600">Logout</button>
                </div>
            </div> : 
            <div className="flex">
                <div className="flex flex-col space-x-2 sm:space-x-5 sm:flex-row">
                <NavLink to="/" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Products</NavLink>
                    <span>|</span>
                <NavLink to="/about" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>About</NavLink>
                    <span>|</span>
                <NavLink to="/contact" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Contact</NavLink>
                </div>
                <div className="flex absolute right-0 pr-10 flex-col space-x-2 sm:space-x-5 sm:flex-row">
                    <NavLink to='/signup' className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Sign Up</NavLink>
                    <span>|</span>
                    <NavLink to='/login' className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Login</NavLink>
                </div>
            </div>}
            <div className="flex absolute right-0 space-x-2 mr-10 mt-4 sm:space-x-5">
                <span className="text-amber-600">{message}</span>
                <NavLink to="/cart" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600 text-xl" : "hover:text-amber-600 text-xl"}>
                    <BsCartCheck /></NavLink>
            </div>
        </nav>
        }
        </Context.Consumer>
    )
}