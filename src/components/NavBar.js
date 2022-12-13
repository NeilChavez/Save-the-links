import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import "./Navbar.css";

export default function NavBar() {
  // TODO extrae isLogged de useAuth;
  // let isLogged = true;
  const { logout, isLogged } = useUser();
  const [showMenu, SetShowMenu] = useState(false)
  const handleClick = () => {
    SetShowMenu(prevState => !prevState);
  }
  return (
    <nav className="navbar" onClick={() => showMenu && SetShowMenu(false)}>
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <Link
            className="navbar-list-link home-title"
            to="/">
            Home
          </Link>
        </li>
        <li className="navbar-list-item">

          <button class={`hamburger hamburger--collapse 
            ${showMenu ? "is-active" : ""} btn-hamburger`}
            type="button"
            onClick={handleClick}>
            <span class="hamburger-box">
              <span class="hamburger-inner hamburger-color"></span>
            </span>
          </button>
          <div className={`login-register-wrapper ${showMenu ? "is-active" : ""}`}>

            {/* <Link
              className="navbar-list-link link"
              to="/login">
              Login
            </Link>
            <Link
              className="navbar-list-link link"
              to="/register">
              Register
            </Link> */}
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
