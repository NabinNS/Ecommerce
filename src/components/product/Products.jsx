import React from "react";
import "../css/product/Products.css";
import exide35Amp from "../../assets/battery/35-amp-battery-exide.jpg";

function Products() {
  return (
    <div className="product-page">
      {/* Product 1 */}
      <div className="product-item">
        <span className="discount-badge">10% OFF</span>
        <img src={exide35Amp} alt="Exide 35 Amp Battery" />
        <div>
          <h3>Exide 35 Amp Battery</h3>
          <p>Warranty: 3 Years</p>
          <p>MRP: $150</p>
        </div>
      </div>
      <div className="product-item">
        <img src={exide35Amp} alt="Battery" />
        <div>
          <h3>Exide 50 Amp Battery</h3>
          <p>Warranty: 2 Years</p>
          <p>MRP: $200</p>
        </div>
      </div>
      <div className="product-item">
        <img src={exide35Amp} alt="Battery" />
        <div>
          <h3>Exide 50 Amp Battery</h3>
          <p>Warranty: 2 Years</p>
          <p>MRP: $200</p>
        </div>
      </div>{" "}
      <div className="product-item">
        <img src={exide35Amp} alt="Battery" />
        <div>
          <h3>Exide 50 Amp Battery</h3>
          <p>Warranty: 2 Years</p>
          <p>MRP: $200</p>
        </div>
      </div>{" "}
      <div className="product-item">
        <img src={exide35Amp} alt="Battery" />
        <div>
          <h3>Exide 50 Amp Battery</h3>
          <p>Warranty: 2 Years</p>
          <p>MRP: $200</p>
        </div>
      </div>{" "}
      <div className="product-item">
        <img src={exide35Amp} alt="Battery" />
        <div>
          <h3>Exide 50 Amp Battery</h3>
          <p>Warranty: 2 Years</p>
          <p>MRP: $200</p>
        </div>
      </div>{" "}
      <div className="product-item">
        <img src={exide35Amp} alt="Battery" />
        <div>
          <h3>Exide 50 Amp Battery</h3>
          <p>Warranty: 2 Years</p>
          <p>MRP: $200</p>
        </div>
      </div>
      <div className="product-item">
        <img src={exide35Amp} alt="Battery" />
        <div>
          <h3>Amaron 40 Amp Battery</h3>
          <p>Warranty: 4 Years</p>
          <p>MRP: $180</p>
          <button className="product-button">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Products;
