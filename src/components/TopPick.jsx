import "./css/TopPick.css";
import { FaCarBattery, FaOilCan, FaTools } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";

import { Link } from "react-router-dom";

function TopPick() {
  return (
    <div className="top-picks-section">
      <div className="brands-header">
        <h4 className="picks-title">Top Picks For You</h4>
      </div>
      <div className="picks-container">
        <Link to={"/products?query=battery"}>
          <div className="pick-card">
            <FaCarBattery className="pick-icon" />
            <h3>Power-Packed Batteries</h3>
            <p>High-performance car batteries for all models.</p>
          </div>
        </Link>
        <Link to={"/products?query=mobil"}>
          <div className="pick-card">
            <FaOilCan className="pick-icon" />
            <h3>Premium Engine Oils</h3>
            <p>High-quality oils to keep your engine running smoothly.</p>
          </div>
        </Link>
        <Link to={"/products?query=tyre"}>
          <div className="pick-card">
            <GiCarWheel className="pick-icon" />
            <h3>Ultra Durable Tires</h3>
            <p>Long-lasting tires suitable for all road conditions.</p>
          </div>
        </Link>
        <Link to={"/products"}>
          <div className="pick-card">
            <FaTools className="pick-icon" />
            <h3>Other Spare Parts</h3>
            <p>Explore a variety of spare parts for all your needs.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TopPick;
