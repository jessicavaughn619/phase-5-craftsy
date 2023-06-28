import { useNavigate, NavLink } from 'react-router-dom';
import { BsCartCheck } from "react-icons/bs"

export default function NavBar({ user, onSetUser, message, onSetMessage }) {

    const navigate = useNavigate()

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              onSetUser(null);
              onSetMessage("Logged out!")
              navigate("/")
            }
          });
        }

    return (
        <nav className="m-5">
            {user ? 
            <div className="relative flex flex-column space-x-10">
                <NavLink to="/" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Home</NavLink>
                <NavLink to="/about" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>About</NavLink>
                <NavLink to="/contact" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Contact</NavLink>
                <div className="absolute top-0 right-0">
                    <button onClick={handleLogoutClick} className="hover:text-amber-600">Logout</button>
                </div>
            </div> : 
            <div className="relative flex flex-column space-x-10">
                <NavLink to="/" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Home</NavLink>
                <NavLink to="/about" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>About</NavLink>
                <NavLink to="/contact" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Contact</NavLink>
                <div className="absolute top-0 right-0 space-x-5">
                    <NavLink to='/signup' className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Sign Up</NavLink>
                    <NavLink to='/login' className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600" : "hover:text-amber-600"}>Login</NavLink>
                </div>
            </div>}
            <div className="flex justify-between mt-5">
                {user ? 
                <p>Welcome, {user.first_name}!</p> :
                <p>Welcome to Craftsy!</p>}
            <div className="flex space-x-6 items-center">
                <span className="text-amber-600">{message}</span>
                <NavLink to="/cart" className={({ isActive, isPending }) =>
                    isPending ? "" : isActive ? "text-amber-600 text-xl" : "hover:text-amber-600 text-xl"}>
                    <BsCartCheck /></NavLink>
                </div>
            </div>
        </nav>
    )
}