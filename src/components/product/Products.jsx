import React, { useState, useEffect } from "react";
import service from "../../appwrite/database";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../css/product/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  const [showFilters, setShowFilters] = useState(false);

  const location = useLocation();
  // let query = new URLSearchParams(location.search).get("query") || "";
  const [query, setQuery] = useState("");
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const [brandData, setBrandData] = useState([
    { name: "Exide", altText: "Exide" },
    { name: "Amaron", altText: "Amaron" },
    { name: "Powerzone", altText: "Powerzone" },
    { name: "Globat", altText: "Globat" },
  ]);
  const filterBrandSelect = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  useEffect(() => {
    const urlQuery = new URLSearchParams(location.search).get("query") || "";
    if (urlQuery) {
      setQuery(urlQuery);
    } else {
      setQuery(""); //required to list every product when filter is empty
    }
  }, [location.search]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await service.listBrands();
        setBrandData((prevData) => [...prevData, ...response.documents]);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        // setError("Unable to fetch products. Please try again later.");
      }
    };

    fetchBrands();
  }, []);

  // Fetch all products
  useEffect(() => {
    const productsList = async () => {
      try {
        const response = await service.listProducts(
          currentPage,
          itemsPerPage,
          query
        );
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
          setFilteredProducts(productsWithImages);
        } else {
          setProducts([]);
          setFilteredProducts([]);
          setError("No products found.");
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Unable to fetch products. Please try again later.");
      }
    };
    productsList();
  }, [currentPage, query]);

  // Filter products based on the query
  // useEffect(() => {
  //   if (query) {
  //     const filtered = products.filter((product) => {
  //       const queryLower = query.toLowerCase();
  //       return (
  //         product.Name.toLowerCase().includes(queryLower) ||
  //         product.Description.toLowerCase().includes(queryLower) ||
  //         product.Brand.toLowerCase().includes(queryLower)
  //       );
  //     });
  //     setFilteredProducts(filtered); // Update filteredProducts
  //   } else {
  //     setFilteredProducts(products); // Reset to all products if no query
  //   }
  // }, [query, products]);

  return (
    <>
      <div className="product-page">
        {/* <div className="filter-container"> */}
        <div
          className={`filter-container ${showFilters ? "" : "shorten-height"}`}
        >
          <div className="title-filter">
            <h4 className="product-title">Products Filter</h4>
            <button
              className="filter-button disabled"
              onClick={() => {
                setShowFilters((prev) => !prev);
              }}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>
          <hr className={`product-hr ${showFilters ? "" : "hidden"}`} />
          <div className={`filter-list ${showFilters ? "" : "hidden"}`}>
            {/* <div className="filter-list"> */}
            <div className="filter-group">
              <label>Brand</label>
              <select onChange={filterBrandSelect}>
                <option value={""} selected>
                  All Brands
                </option>
                {brandData?.map((data, index) => (
                  <option key={index} value={data.name}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Price Range</label>
              <div className="price-range-inputs">
                <input
                  type="number"
                  placeholder="From"
                  min="0"
                  className="price-input"
                />
                <span className="price-separator">to</span>
                <input
                  type="number"
                  placeholder="To"
                  min="0"
                  className="price-input"
                />
              </div>
            </div>
            <div className="filter-group">
              <label>Category</label>
              <select>
                <option value="all" disabled>
                  All Categories
                </option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="books">Books</option>
              </select>
            </div>
            <div className="filter-group">
              <div>
                <label>Hot Deals</label>
                <input type="checkbox" />
                <label className="inline-label">Show hot deals</label>
              </div>
            </div>
            <div className="filter-group">
              <label>Vehicle Type</label>
              <select>
                <option value="all" disabled>
                  All Categories
                </option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="books">Books</option>
              </select>
            </div>
            <div className="filter-group">
              <div>
                <label>View Latest Products</label>
                <input type="checkbox" />
                <label className="inline-label">Show Newest Products</label>
              </div>
            </div>
          </div>
        </div>
        <div className="product-container">
          <div className="title-filter">
            <h4 className="product-title">Top Products</h4>
            <select className="product-filter-select">
              <option value="all" disabled>
                All Brands
              </option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
            </select>
          </div>
          <hr className="product-hr" />
          <div className="product-list">
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
              <p className="select-companies">
                No products available currently.
              </p>
            )}
          </div>
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="pagination-button previous"
            >
              Previous
            </button>
            <span className="page-number">{currentPage + 1}</span>
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={filteredProducts.length < itemsPerPage}
              className="pagination-button next"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
