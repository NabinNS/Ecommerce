import React, { useEffect, useState } from "react";
import "./css/Home.css";
import Brand from "./Brand.jsx";
import wallpaper1 from "../assets/images/wallpaper 1.jpg";
import wallpaper2 from "../assets/images/wallpaper 2.jpg";
import wallpaper3 from "../assets/images/wallpaper 3.jpg";
import wallpaper4 from "../assets/images/wallpaper 4.jpg";
import TopPick from "./TopPick.jsx";
import VideoSection from "./VideoSection.jsx";
import { Link } from "react-router-dom";

function Home() {
  const wallpapers = [wallpaper1, wallpaper2, wallpaper3, wallpaper4];
  const [wallpaperIndex, setWallpaperIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setWallpaperIndex((prevIndex) => (prevIndex + 1) % wallpapers.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [wallpapers.length]);

  return (
    <>
      <div className="full-screen-container">
        <img
          className="full-screen-background"
          src={wallpapers[wallpaperIndex]}
          alt="React Image"
        />
        <div className="description-box">
          <h1>Welcome To Battery Shop</h1>
          <p>
            Find unbeatable prices on leading battery brands like Exide,
            Powerzone, Globat, and Amaron—right here in town!
          </p>
          <Link to="/products">
            <button className="action-button">Explore Products</button>
          </Link>
        </div>
      </div>
      <Brand />
      <hr />
      <TopPick />
      <VideoSection />
    </>
  );
}

export default Home;
