import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import "./Navbar.css";

export default function NavBar() {
  // TODO extrae isLogged de useAuth;
  // let isLogged = true;
  const { logout, isLogged } = useUser();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <Link className="navbar-list-link home-title" to="/">
            Home
          </Link>
        </li>
        <li className="navbar-list-item">
          <div className="login-register-wrapper">
            {isLogged ? (
              <>
                <Link className="navbar-list-link link" to="/dashboard">
                  My page
                </Link>
                <Link className="navbar-list-link link" to="/" onClick={logout}>
                  logout
                </Link>
              </>
            ) : (
              <>
                <Link className="navbar-list-link link" to="/login">
                  Login
                </Link>
                <Link className="navbar-list-link link" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
