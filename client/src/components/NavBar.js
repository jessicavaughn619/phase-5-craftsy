import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ user, onSetUser }) {

    const navigate = useNavigate()

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              onSetUser(null);
              navigate("/")
            }
          });
        }

    return (
        <nav className="m-5">
            {user ? 
            <div className="relative flex flex-column space-x-10">
                <Link to="/" className="hover:text-amber-600">Home</Link>
                <Link to="/about" className="hover:text-amber-600">About</Link>
                <Link to="/contact" className="hover:text-amber-600">Contact</Link>
                <Link to="/wishlists" className="hover:text-amber-600">Wishlists</Link>
                <div className="absolute top-0 right-0">
                    <Link to="/logout" onClick={handleLogoutClick} className="hover:text-amber-600">Logout</Link>
                </div>
            </div> : 
            <div className="relative flex flex-column space-x-10">
                <Link to="/" className="hover:text-amber-600">Home</Link>
                <Link to="/about" className="hover:text-amber-600">About</Link>
                <Link to="/contact" className="hover:text-amber-600">Contact</Link>
                <div className="absolute top-0 right-0 space-x-5">
                    <Link to='/signup' className="hover:text-amber-600">Sign Up</Link>
                    <Link to='/login' className="hover:text-amber-600">Login</Link>
                </div>
            </div>}
        </nav>
    )
}