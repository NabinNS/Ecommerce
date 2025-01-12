import "../css/admin/ProductsSetting.css";
import Input from "../../Input";
import { useState, useContext, useEffect } from "react";
import service from "../../appwrite/database";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

function AddProducts() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [brandOptions, setBrandOptions] = useState([
    "Exide",
    "Amaron",
    "Powerzone",
    "Globat",
  ]);

  const [selectedBrand, setSelectedBrand] = useState(brandOptions[0]);

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const fetchBrand = async (e) => {
    try {
      const data = await service.listBrands();
      const brandNames = data.documents.map((doc) => doc.Name);
      setBrandOptions((prevOptions) => [...prevOptions, ...brandNames]);
    } catch (error) {
      console.log(error);
    }
  };

  const AddProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!productImage || !productName || !price || !description) {
        setError("Please upload necessary field.");
        return;
      }
      const productImageData = await service.addProductImage({
        productImage,
      });
      // console.log(productImageData.$id);
      await service.addProduct({
        productName,
        price,
        offer: offer ? offer : 0,
        description,
        selectedBrand,
        ImageId: productImageData.$id,
        userId: user.$id,
      });

      // Reset all states
      setProductName("");
      setPrice("");
      setOffer("");
      setDescription("");
      setProductImage(null);

      // Navigate back to the previous page
      navigate(-1);
    } catch (error) {
      setError("Failed to add product. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBrand();
  }, []);

  return (
    <>
      <div className="product-form-container">
        <h2>Add New Product</h2>
        <form onSubmit={AddProduct}>
          <Input
            label="Product Name"
            type="text"
            id="productName"
            value={productName}
            placeholder="Enter Product Name"
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <div className="input-form-group">
            <Input
              label="Price"
              type="number"
              id="price"
              value={price}
              placeholder="Enter Product Price"
              onChange={(e) =>
                setPrice(e.target.value ? parseInt(e.target.value, 10) : "")
              }
              // Ensure value is an integer
              required
            />

            <Input
              label="Offer"
              type="number"
              id="offer"
              value={offer}
              placeholder="Enter Offer (if any)"
              onChange={(e) =>
                setOffer(e.target.value ? parseInt(e.target.value, 10) : "")
              }
              // Ensure value is an integer
            />
          </div>
          <Input
            label="Description"
            type="text"
            id="description"
            value={description}
            placeholder="Enter Product Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></Input>

          <div className="input-form-group">
            <div className="form-group">
              <label htmlFor="brand">Select Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                }}
              >
                {brandOptions.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Product Image **PNG files only**"
              type="file"
              id="productImage"
              onChange={handleImageChange}
              placeholder="Product Image"
              accept="image/*"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="action-button"
          >
            {isSubmitting ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProducts;
