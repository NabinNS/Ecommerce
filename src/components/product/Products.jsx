import React, { useState, useEffect } from "react";
import service from "../../appwrite/database";

import "../css/product/Products.css";
import exide35Amp from "../../assets/battery/35-amp-battery-exide.png";
import amaron35Amp from "../../assets/battery/35-amp-battery-amaron.png";
import powerzone35Amp from "../../assets/battery/35-amp-battery-powerzone.png";
import globat35Amp from "../../assets/battery/35-amp-battery-globat.png";
import exide80Amp from "../../assets/battery/80-amp-battery-exide.png";
import amaron80Amp from "../../assets/battery/80-amp-battery-amaron.png";
import powerzone80Amp from "../../assets/battery/80-amp-battery-powerzone.png";
import globat80Amp from "../../assets/battery/80-amp-battery-globat.png";
import exide70Amp from "../../assets/battery/70-amp-battery-exide.png";
import amaron70Amp from "../../assets/battery/70-amp-battery-amaron.png";
import powerzone70Amp from "../../assets/battery/70-amp-battery-powerzone.png";

function Products() {
  const [selectedCompany, setSelectedCompany] = useState(""); // Track selected company
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productsList = async () => {
      try {
        const response = await service.listProducts();
        if (response.documents) {
          const productsWithImages = await Promise.all(
            response.documents.map(async (product) => {
              const imageUrl = await service.getProductImage({
                productImage: product.ProductImageId,
              });
              return { ...product, imageUrl };
            })
          );
          setProducts(productsWithImages);
        } else {
          setError("No products found.");
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Unable to fetch products. Please try again later.");
      }
    };
    productsList();
  }, []);

  // Filter products based on the selected company
  // const filteredProducts = selectedCompany
  //   ? products.filter((product) => product.company === selectedCompany)
  //   : products;

  return (
    <>
      <div className="select-companies">
        <h4>Top Products</h4>
      </div>
      <hr />
      <div className="product-page">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="product-item" key={index}>
              {product.Offer != 0 && (
                <span className="discount-badge">{product.Offer}% Off</span>
              )}
              <img src={product.imageUrl} alt={product.Name} />
              <div className="product-info">
                <h3>{product.Name}</h3>
                <p>
                  Price: Nrs <span className="price">{product.Price}</span>
                </p>
                <button className="product-button">Buy Now</button>
              </div>
            </div>
          ))
        ) : (
          <p className="select-companies">No products available currently.</p>
        )}
      </div>
    </>
  );
}

export default Products;
