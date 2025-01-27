import React, { useState, useEffect, useContext } from "react";
import service from "../../appwrite/database";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../css/product/Products.css";
import { FaCartShopping } from "react-icons/fa6";
import { AuthContext } from "../../AuthContext";
import Swal from "sweetalert2";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [hotDeals, setHotDeals] = useState(false);
  const [showNewest, setShowNewest] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceSearchTriggered, setPriceSearchTriggered] = useState(false);
  const [sortOrder, setSortOrder] = useState(""); // "high" or "low"

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
  const categoryData = ["Battery", "Tyres", "Lubricants", "Miscellaneous"];
  const { user, setUser } = useContext(AuthContext);

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
        if (response?.documents) {
          const apiBrands = response.documents.map((data) => ({
            name: data.Name,
            altText: data.Name,
          }));

          const uniqueBrands = [...brandData, ...apiBrands].reduce(
            (acc, brand) => {
              if (!acc.some((item) => item.name === brand.name)) {
                acc.push(brand);
              }
              return acc;
            },
            []
          );

          setBrandData(uniqueBrands);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        // setError("Unable to fetch products. Please try again later.");
      }
    };

    fetchBrands();
  }, []);

  // Fetch all products
  const productsList = async () => {
    try {
      const response = await service.listProducts(
        currentPage,
        itemsPerPage,
        query,
        hotDeals,
        showNewest,
        minPrice ? parseFloat(minPrice) : undefined,
        maxPrice ? parseFloat(maxPrice) : undefined
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
  useEffect(() => {
    productsList();
  }, [currentPage, query, hotDeals, showNewest]);

  const resetPrice = () => {
    setMinPrice("");
    setMaxPrice("");
    setPriceSearchTriggered(true);
  };

  const handlePriceSearch = () => {
    setPriceSearchTriggered(true);
  };
  useEffect(() => {
    if (priceSearchTriggered) {
      productsList(); // Fetch products based on current minPrice and maxPrice
      setPriceSearchTriggered(false); // Reset the trigger after the update
    }
  }, [priceSearchTriggered]);

  // Filter products based on the query
  const filterAndSortProducts = () => {
    let updatedProducts = [...products];

    // Sort by price
    if (sortOrder === "high") {
      updatedProducts.sort((a, b) => b.Price - a.Price);
    } else if (sortOrder === "low") {
      updatedProducts.sort((a, b) => a.Price - b.Price);
    }

    setFilteredProducts(updatedProducts);
  };

  useEffect(() => {
    filterAndSortProducts();
  }, [products, sortOrder]); // Trigger filtering when these values change

  //add product to cart
  const addToCart = async (productId) => {
    if (user) {
      try {
        await service.addToCart({ productId, userId: user.$id });
      } catch (error) {
        setError("Failed to add product. Please try again.");
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "You need to be logged in to add product to cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then(async (result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

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
                <option value="">All Brands</option>
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
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="price-separator">to</span>
                <input
                  type="number"
                  placeholder="To"
                  min="0"
                  className="price-input"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <button
                  className="price-search-btn"
                  onClick={handlePriceSearch}
                >
                  search
                </button>
              </div>
              {(maxPrice || minPrice) && (
                <div className="price-btn">
                  <button className="price-reset-btn" onClick={resetPrice}>
                    Reset
                  </button>
                </div>
              )}
            </div>
            <div className="filter-group">
              <label>Category</label>
              <select onChange={filterBrandSelect}>
                <option value="">All Categories</option>
                {categoryData.map((data, index) => (
                  <option key={index} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <div>
                <label>Hot Deals</label>
                <input
                  type="checkbox"
                  checked={hotDeals}
                  onChange={(e) => {
                    setHotDeals(!hotDeals);
                  }}
                />
                <label className="inline-label">Show hot deals</label>
              </div>
            </div>
            <div className="filter-group">
              <label>Vehicle Type</label>
              <select onChange={filterBrandSelect}>
                <option value="">All Type</option>
                <option value="Four Wheeler">Four Wheeler</option>
                <option value="Two Wheeler">Two Wheeler</option>
              </select>
            </div>
            <div className="filter-group">
              <div>
                <label>View Latest Products</label>
                <input
                  type="checkbox"
                  checked={showNewest}
                  onChange={(e) => {
                    setShowNewest(!showNewest);
                  }}
                />
                <label className="inline-label">Show Newest Products</label>
              </div>
            </div>
          </div>
        </div>
        <div className="product-container">
          <div className="title-filter">
            <h4 className="product-title">Top Products</h4>
            <select
              className="product-filter-select"
              onChange={(e) => {
                setSortOrder(e.target.value);
              }}
              value={sortOrder}
            >
              <option value="" disabled>
                Product Price
              </option>
              <option value="default">Default</option>
              <option value="high">High to Low</option>
              <option value="low">Low to High</option>
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
                    <div className="button-icon">
                      <button className="product-button">Buy Now</button>
                      <button
                        className="cart-button"
                        onClick={() => {
                          addToCart(product.$id);
                        }}
                      >
                        <FaCartShopping />
                      </button>
                    </div>
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
