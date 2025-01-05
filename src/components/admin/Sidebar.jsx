import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaTachometerAlt, FaBox, FaThList } from "react-icons/fa";
import Content from "./Content.jsx";
import "../css/admin/sidebar.css";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="logo">
          <Link to="/">
            <h2>Car Verse</h2>
          </Link>
          <hr />
        </div>
        <ul className="nav-list">
          <li>
            <Link to="/dashboard">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="products">
              <FaBox /> Products
            </Link>
          </li>
          <li>
            <Link to="categories">
              <FaThList /> Categories
            </Link>
          </li>

          <div className="nav-section">AUTH</div>
          <li>
            <Link to="/login">
              <FaSignInAlt /> Logout
            </Link>
          </li>
        </ul>
      </div>

      <div className="topbar">
        <div className="notification">
          <h4>hello</h4>
        </div>
        <div className="user-profile">
          <img
            src="https://via.placeholder.com/40"
            alt="profile"
            className="profile-img"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
