import { FaUserCircle } from "react-icons/fa";
import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./css/Navbar.css";
import navbarlogo from "../assets/logo/navbarlogo.png";
import authService from "../appwrite/appwrite";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      navigate("/");
      setIsDropdownOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const searchFunction = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    navigate(`/products?query=${newQuery}`, { replace: true });
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link">
          <img src={navbarlogo} alt="logo" className="navbar-logo" />
          <h4 className="navbar-title">
            Battery And <br />
            Parts Shop
          </h4>
        </Link>
      </div>
      <div className={`navbar-center ${isMenuOpen ? "active" : ""}`}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={searchFunction}
        />
      </div>
      <div className="navbar-right">
        {user ? (
          <div className="user-menu" ref={dropdownRef}>
            <FaUserCircle
              size={28}
              className="user-icon"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="dropdown">
                <p className="dropdown-element">Hello, {user.name || "User"}</p>
                <Link
                  className="dropdown-element"
                  to={"/profile/dashboard/" + user.$id}
                >
                  View Profile
                </Link>
                <button
                  className="dropdown-element logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}
      </div>
      <div className="burger" onClick={toggleMenu}>
        <div className={`line ${isMenuOpen ? "active" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "active" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "active" : ""}`}></div>
      </div>
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <ul>
          {user ? (
            <>
              <p className="dropdown-element">Hello, {user.name || "User"}</p>
              <Link
                className="dropdown-element"
                to={"/profile/dashboard/" + user.$id}
              >
                View Profile
              </Link>
              <button
                className="dropdown-element logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {/* <li>
            <Link to="/login">Login</Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
