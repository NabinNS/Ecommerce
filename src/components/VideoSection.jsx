import "./css/VideoSection.css";
import batteryVideo from "../assets/videos/man.mp4";
function VideoSection() {
  return (
    <div className="video-info-section">
      <div className="video-container">
        <video className="video-player" autoPlay muted loop>
          <source src={batteryVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="info-container">
        <h3 className="info-title">Battery Services</h3>
        <p className="info-text">
          At Battery Shop, we offer top-notch services to ensure your vehicle
          runs smoothly. Our expert team specializes in:
        </p>
        <ul className="info-list">
          <li>Car battery installation and replacement</li>
          <li>Bike battery check-ups and maintenance</li>
          <li>High-quality spare parts for all Car needs</li>
          <li>24/7 emergency assistance</li>
        </ul>
      </div>
    </div>
  );
}
export default VideoSection;
