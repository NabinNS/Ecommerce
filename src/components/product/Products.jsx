import React from "react";
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
  const products = [
    {
      id: 1,
      name: "Exide 35 Amp Battery",
      warranty: "3 Years",
      price: "$150",
      img: exide35Amp,
      discount: "10% OFF",
    },
    {
      id: 2,
      name: "Amaron 35 Amp Battery",
      warranty: "2 Years",
      price: "$200",
      img: amaron35Amp,
    },
    {
      id: 3,
      name: "PowerZone 40 Amp Battery",
      warranty: "4 Years",
      price: "$180",
      img: powerzone35Amp,
    },
    {
      id: 4,
      name: "Globat 40 Amp Battery",
      warranty: "4 Years",
      price: "$180",
      img: globat35Amp,
    },
    {
      id: 5,
      name: "Exide 80 Amp Battery",
      warranty: "4 Years",
      price: "$180",
      img: exide80Amp,
    },
    {
      id: 6,
      name: "Exide 80 Amp Battery",
      warranty: "4 Years",
      price: "$180",
      img: amaron80Amp,
    },
    {
      id: 7,
      name: "Exide 80 Amp Battery",
      warranty: "4 Years",
      price: "$180",
      img: powerzone80Amp,
    },
    {
      id: 8,
      name: "Exide 80 Amp Battery",
      warranty: "4 Years",
      price: "$180",
      img: globat80Amp,
    },
    {
      id: 9,
      name: "Exide 80 Amp Battery",
      warranty: "4 Years",
      price: "$180",
      img: exide70Amp,
    },
    {
      id: 10,
      name: "Exide 80 Amp Battery",
      warranty: "4 Years",
      price: "$180",
      img: amaron70Amp,
    },
    {
      id: 11,
      name: "Exide 80 Amp Battery",
      warranty: "4 Years",
      price: "$180",
      img: powerzone70Amp,
    },
  ];

  return (
    <div className="product-page">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          {product.discount && (
            <span className="discount-badge">{product.discount}</span>
          )}
          <img src={product.img} alt={product.name} />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>Warranty: {product.warranty}</p>
            <p>Price: {product.price}</p>
            <button className="product-button">Buy Now</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
