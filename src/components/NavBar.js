import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import HamburgerButton from "../components/HamburgerButton"
import "./Navbar.css";

export default function NavBar() {
  // TODO extrae isLogged de useAuth;
  // let isLogged = true;
  const { logout, isLogged } = useUser();
  const [showMenu, setShowMenu] = useState(false)
  const handleClick = () => {
    setShowMenu(prevState => !prevState);
  }
  return (
    <nav className="navbar" onClick={() => showMenu && setShowMenu(false)}>
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <Link
            className="navbar-list-link home-title"
            to="/">
            Home
          </Link>
        </li>
        <li className="navbar-list-item">
          <HamburgerButton 
          showMenu={showMenu} 
          handleClick={handleClick} />
          <div className={`login-register-wrapper ${showMenu ? "is-active" : ""}`}>
            {isLogged ? (
              <>
                <Link className="navbar-list-link link" to="/dashboard">
                  MyPage
                </Link>
                <Link className="navbar-list-link link" to="/" onClick={logout}>
                  Logout
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
