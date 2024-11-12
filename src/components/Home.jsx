import React from "react";
import "./Home.css";
import Brand from "./Brand.jsx";
import wallpaper1 from "../assets/images/wallpaper 1.jpg";
import wallpaper2 from "../assets/images/wallpaper 2.jpg";
import wallpaper3 from "../assets/images/wallpaper 3.jpg";
import wallpaper4 from "../assets/images/wallpaper 4.jpg";
import TopPick from "./TopPick.jsx";
import Footer from "./Footer.jsx";

function Home() {
  return (
    <>
      <div className="full-screen-container">
        <img
          className="full-screen-background"
          src={wallpaper1}
          alt="React Image"
        />
        <div className="description-box">
          <h1>Welcome To Battery Shop</h1>
          <p>
            Find unbeatable prices on leading battery brands like Exide,
            Powerzone, Globat, and Amaron—right here in town!
          </p>
          <button className="action-button">Explore More</button>
        </div>
      </div>
      <Brand />
      <TopPick />
      <Footer />
    </>
  );
}

export default Home;
