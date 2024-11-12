import { FaUserCircle } from "react-icons/fa"; // for profile icon
import "./Navbar.css";
function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h3>Battery Shop</h3>
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
