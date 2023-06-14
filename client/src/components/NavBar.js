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
        <nav>
            {user ? 
            <div className="flex flex-row">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <div>
                    <Link to="/logout" onClick={handleLogoutClick}>Logout</Link>
                </div>
            </div> : 
            <div className="flex flex-row">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <div>
                    <Link to='/signup' className="link">Sign Up</Link>
                    <Link to='/login' className="link">Login</Link>
                </div>
            </div>}
        </nav>
    )
}