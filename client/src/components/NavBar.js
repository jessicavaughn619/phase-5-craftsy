import { useNavigate, NavLink } from 'react-router-dom';
import { Context } from '../context';
import { AiFillCloseSquare } from "react-icons/ai"

export default function NavBar({ onSetUser, onSetMessage, productsInCart, onSetProductsInCart, isMenu, isMenuOpen, onSetIsMenuOpen }) {
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
          handleMenuCloseClick();
        }

    function handleMenuCloseClick() {
        onSetIsMenuOpen(false)
    }

    return (
        <Context.Consumer>
        {user => <nav className={isMenu ? "m-5 py-2" : "m-5 py-2 border-y-2 border-gray-100"}>
            <div className={isMenu ? "flex flex-col gap-2" : "flex"}>
                {isMenu ? <AiFillCloseSquare className="text-xl hover:text-amber-600 cursor-pointer self-end" onClick={handleMenuCloseClick} /> : null}
                <div className={isMenu ? "flex flex-col" : "flex flex-col sm:flex-row sm:space-x-5"}>
                <NavLink to="/" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"} onClick={handleMenuCloseClick}>Products</NavLink>
                <NavLink to="/about" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"} onClick={handleMenuCloseClick}>About</NavLink>
                <NavLink to="/contact" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"} onClick={handleMenuCloseClick}>Contact</NavLink>
                </div>
                {user ?
                <div className={isMenu ? "flex" : "flex absolute right-0 pr-10 flex-col items-end sm:flex-row sm:space-x-5"}>
                    {isMenu ? null : <p className="font-light">Welcome, {user.first_name}</p>}
                    <button onClick={handleLogoutClick} className="hover:text-amber-600">Logout</button>
                </div> : 
                <div className={isMenu ? "flex flex-col": "flex absolute right-0 mr-5 flex-col items-end sm:flex-row sm:space-x-5"}>
                    <NavLink to='/signup' className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"} onClick={handleMenuCloseClick}>Sign Up</NavLink>
                    <NavLink to='/login' className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"} onClick={handleMenuCloseClick}>Login</NavLink>
                </div>}
            </div>
        </nav>
        }
        </Context.Consumer>
    )
}