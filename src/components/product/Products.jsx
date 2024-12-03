import React, { useState } from "react";
import "../css/product/Products.css";
import exide35Amp from "../../assets/battery/35-amp-battery-exide.jpg";
import amaron35Amp from "../../assets/battery/35-amp-battery-amaron.jpg";
import powerzone35Amp from "../../assets/battery/35-amp-battery-powerzone.jpg";
import globat35Amp from "../../assets/battery/35-amp-battery-globat.jpg";
import exide80Amp from "../../assets/battery/80-amp-battery-exide.jpg";
import amaron80Amp from "../../assets/battery/80-amp-battery-amaron.jpg";
import powerzone80Amp from "../../assets/battery/80-amp-battery-powerzone.jpg";
import globat80Amp from "../../assets/battery/80-amp-battery-globat.jpg";
import exide70Amp from "../../assets/battery/70-amp-battery-exide.jpg";
import amaron70Amp from "../../assets/battery/70-amp-battery-amaron.jpg";
import powerzone70Amp from "../../assets/battery/70-amp-battery-powerzone.jpg";

function Products() {
  const [selectedCompany, setSelectedCompany] = useState(""); // Track selected company

  const products = [
    {
      id: 1,
      name: "Exide 35 Amp Battery",
      company: "Exide",
      warranty: "4 Years",
      price: "7800",
      img: exide35Amp,
      discount: "10% OFF",
    },
    {
      id: 2,
      name: "Amaron 35 Amp Battery",
      company: "Amaron",
      warranty: "4 Years",
      price: "7200",
      img: amaron35Amp,
    },
    {
      id: 3,
      name: "PowerZone 40 Amp Battery",
      company: "Powerzone",
      warranty: "4 Years",
      price: "7000",
      img: powerzone35Amp,
    },
    {
      id: 4,
      name: "Globat 40 Amp Battery",
      company: "Globat",
      warranty: "4 Years",
      price: "6800",
      img: globat35Amp,
    },
    {
      id: 5,
      name: "Exide 80 Amp Battery",
      company: "Exide",
      warranty: "4 Years",
      price: "16500",
      img: exide80Amp,
    },
    {
      id: 6,
      name: "Amaron 80 Amp Battery",
      company: "Amaron",
      warranty: "4 Years",
      price: "14000",
      img: amaron80Amp,
    },
    {
      id: 7,
      name: "PowerZone 80 Amp Battery",
      company: "Powerzone",
      warranty: "4 Years",
      price: "14000",
      img: powerzone80Amp,
    },
    {
      id: 8,
      name: "Globat 80 Amp Battery",
      company: "Globat",
      warranty: "4 Years",
      price: "13500",
      img: globat80Amp,
    },
    {
      id: 9,
      name: "Exide 70 Amp Battery",
      company: "Exide",
      warranty: "4 Years",
      price: "14900",
      img: exide70Amp,
    },
    {
      id: 10,
      name: "Amaron 70 Amp Battery",
      company: "Amaron",
      warranty: "4 Years",
      price: "13500",
      img: amaron70Amp,
    },
    {
      id: 11,
      name: "PowerZone 70 Amp Battery",
      company: "Powerzone",
      warranty: "4 Years",
      price: "12900",
      img: powerzone70Amp,
    },
  ];

  // Filter products based on the selected company
  const filteredProducts = selectedCompany
    ? products.filter((product) => product.company === selectedCompany)
    : products;

  return (
    <>
      <div className="select-companies">
        <h4>Top Companies</h4>
        <div className="tabs-container">
          {["All", "Exide", "Powerzone", "Amaron", "Globat"].map((company) => (
            <button
              key={company}
              className={`tab-button ${
                selectedCompany === company ? "active" : ""
              }`}
              onClick={() =>
                setSelectedCompany(company === "All" ? "" : company)
              }
            >
              {company}
            </button>
          ))}
        </div>
      </div>
      <hr />
      <div className="product-page">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              {product.discount && (
                <span className="discount-badge">{product.discount}</span>
              )}
              <img src={product.img} alt={product.name} />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Warranty: {product.warranty}</p>
                <p>
                  Price: Nrs <span className="price">{product.price}</span>
                </p>
                <button className="product-button">Buy Now</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available for the selected company.</p>
        )}
      </div>
    </>
  );
}

export default Products;
