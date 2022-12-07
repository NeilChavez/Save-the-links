import { Link } from "react-router-dom";
import "./Navbar.css";

export default function NavBar() {
  const isLogged = true;
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
                <Link className="navbar-list-link link" to="/login">
                  Login
                </Link>
                <Link className="navbar-list-link link" to="/register">
                  Register
                </Link>
              </>
            ) : (
              <Link className="navbar-list-link link" to="/login">
                logout
              </Link>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
