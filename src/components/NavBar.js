import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Navbar.css";

export default function NavBar() {
  // TODO extrae isLogged de useAuth;
  // let isLogged = true;
  const { logout, setUser, isLogged } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      window.sessionStorage.removeItem("accessToken");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.warn(err);
    }
  };

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
                <Link
                  className="navbar-list-link link"
                  to="/"
                  onClick={handleLogout}
                >
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
