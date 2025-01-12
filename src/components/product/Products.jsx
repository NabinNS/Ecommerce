import React, { useState, useEffect } from "react";
import service from "../../appwrite/database";
import { useLocation } from "react-router-dom";
import "../css/product/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  // Fetch all products
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
          setFilteredProducts(productsWithImages); // Initialize filteredProducts with all products
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

  // Filter products based on the query
  useEffect(() => {
    if (query) {
      const filtered = products.filter((product) => {
        const queryLower = query.toLowerCase();
        return (
          product.Name.toLowerCase().includes(queryLower) ||
          product.Description.toLowerCase().includes(queryLower) ||
          product.Brand.toLowerCase().includes(queryLower)
        );
      });
      setFilteredProducts(filtered); // Update filteredProducts
    } else {
      setFilteredProducts(products); // Reset to all products if no query
    }
  }, [query, products]);

  return (
    <>
      <div className="select-companies">
        <h4>Top Products</h4>
      </div>
      <hr />
      <div className="product-page">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className="product-item" key={index}>
              {product.Offer !== 0 && (
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
