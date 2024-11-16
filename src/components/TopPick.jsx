import "./css/TopPick.css";
import { FaCar, FaMotorcycle, FaTools } from "react-icons/fa";

function TopPick() {
  return (
    <div className="top-picks-section">
      <h3 className="section-title">Top Picks</h3>
      <div className="picks-container">
        <div className="pick-card">
          <FaCar className="pick-icon" />
          <h3>Battery for Cars</h3>
          <p>High-performance car batteries for all models.</p>
        </div>
        <div className="pick-card">
          <FaMotorcycle className="pick-icon" />
          <h3>Battery for Bikes</h3>
          <p>Reliable and long-lasting batteries for bikes.</p>
        </div>
        <div className="pick-card">
          <FaTools className="pick-icon" />
          <h3>Other Spare Parts</h3>
          <p>Explore a variety of spare parts for all your needs.</p>
        </div>
      </div>
    </div>
  );
}

export default TopPick;
