// src/Navbar.js
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import "./css/Navbar.css";
import navbarlogo from "../assets/logo/navbarlogo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <input type="text" placeholder="Search for products..." />
      </div>
      <div className="navbar-right">
        <a href="#" className="login-icon">
          <FaUserCircle size={28} />
        </a>
      </div>
      {/* Burger Button for Mobile */}
      <div className="burger" onClick={toggleMenu}>
        <div className={`line ${isMenuOpen ? "active" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "active" : ""}`}></div>
        <div className={`line ${isMenuOpen ? "active" : ""}`}></div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#">Login</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
