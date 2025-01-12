import "./css/Brand.css";
import { Link } from "react-router-dom";
import service from "../appwrite/database";

import Exide from "../assets/logo/exide.png";
import Amaron from "../assets/logo/amaron.png";
import Powerzone from "../assets/logo/powerzone.png";
import Globat from "../assets/logo/globat.png";
import { useEffect, useState } from "react";

function Brand() {
  const [brandData, setBrandData] = useState([
    { logo: Exide, altText: "Exide" },
    { logo: Amaron, altText: "Amaron" },
    { logo: Powerzone, altText: "Powerzone" },
    { logo: Globat, altText: "Globat" },
  ]);

  const [searchBrand, setSearchBrand] = useState("");
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await service.listBrands();
        if (response.documents) {
          const fetchedBrandData = await Promise.all(
            response.documents.map(async (brand) => {
              const imageUrl = await service.getBrandImage({
                brandImage: brand.BrandImageId,
              });
              return { logo: imageUrl, altText: brand.Name };
            })
          );
          // setBrandData([...brandData, ...fetchedBrandData]);
          setBrandData((prevData) => [...prevData, ...fetchedBrandData]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        // setError("Unable to fetch products. Please try again later.");
      }
    };

    fetchBrands();
  }, []);

  const filteredBrandData = brandData.filter((data) =>
    data.altText.toLowerCase().includes(searchBrand.toLowerCase())
  );

  return (
    <>
      <div className="top-brands-section">
        <div className="brands-header">
          <h4 className="section-title">Top Brands</h4>
          <div className="slideshow-container">
            <p className="slideshow">
              {brandData.map((data) => data.altText).join(" , ")}
            </p>
          </div>
          <input
            className="brand-search"
            type="text"
            placeholder="Search for brands..."
            value={searchBrand}
            onChange={(e) => setSearchBrand(e.target.value)}
          />
        </div>
        <div className="brands-scroll-container">
          <div className="brands-container">
            {filteredBrandData.map((brand, index) => (
              <Link to={`/products?query=${brand.altText}`} key={index}>
                <div className="brand-card">
                  <img src={brand.logo} alt={brand.altText} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Brand;
