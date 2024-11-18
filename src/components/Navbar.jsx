import { FaUserCircle } from "react-icons/fa"; // for profile icon
import "./css/Navbar.css";
import navbarlogo from "../assets/logo/navbarlogo.png";
function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={navbarlogo} alt="logo" />
      </div>
      <div className="navbar-center">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="navbar-right">
        <a href="#" className="login-icon">
          <FaUserCircle size={24} /> {/* Profile icon */}
        </a>
      </div>
    </div>
  );
}
export default Navbar;
