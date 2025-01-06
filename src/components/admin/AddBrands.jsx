import Input from "../../Input";
import { useState, useContext } from "react";
import service from "../../appwrite/database";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

function AddBrands() {
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState();
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const AddBrand = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productImageData = await service.addBrandImage({
        brandImage,
      });
      await service.addBrand({
        brandName,
        ImageId: productImageData.$id,
        userId: user.$id,
      });

      // Reset all states
      setBrandName("");
      setBrandImage(null);

      // Navigate back to the previous page
      navigate(-1);
    } catch (error) {
      setError("Failed to add product. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleImageChange = (e) => {
    setBrandImage(e.target.files[0]);
  };
  return (
    <>
      <div className="product-form-container">
        <h2>Add New Brand</h2>
        <form onSubmit={AddBrand}>
          <Input
            label="Brand Name"
            type="text"
            id="brandname"
            value={brandName}
            placeholder="Enter Brand Name"
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
          <Input
            label="Brand Image **PNG files only**"
            type="file"
            id="productImage"
            onChange={handleImageChange}
            placeholder="Brand Image"
            accept="image/*"
          />
          {error && <p className="error-message">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="action-button"
          >
            {isSubmitting ? "Adding..." : "Add Brand"}
          </button>
        </form>
      </div>
    </>
  );
}
export default AddBrands;
