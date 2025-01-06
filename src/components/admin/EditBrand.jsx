import { useParams, useNavigate } from "react-router-dom";
import service from "../../appwrite/database";
import { useEffect, useState, useContext } from "react";
import Input from "../../Input";
import { AuthContext } from "../../AuthContext";

function EditBrand() {
  const { brandId } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch product data
  const getBrand = async () => {
    try {
      const result = await service.getBrand(brandId);
      const imageUrl = await service.getBrandImage({
        brandImage: result.BrandImageId,
      });
      setBrand({ ...result, ImageURL: imageUrl });
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Unable to fetch product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (e) => {
    setBrand({ ...brand, NewImage: e.target.files[0] });
  };
  // console.log(product);

  const EditBrand = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let newImageId = brand.BrandImageId;
      if (brand.NewImage) {
        const brandImageData = await service.addBrandImage({
          brandImage: brand.NewImage,
        });
        newImageId = brandImageData.$id;
      }
      await service.updateBrand(brandId, {
        Name: brand.Name,
        BrandImageId: newImageId,
        userId: user.$id,
      });
      // Navigate back to the previous page
      navigate(-1);
    } catch (error) {
      setError("Failed to edit brand. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getBrand();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      {brand ? (
        <form onSubmit={EditBrand}>
          <div className="image-form-container">
            <div className="image-container">
              <img
                src={brand.ImageURL}
                className="edit-productImage"
                alt={brand.Name}
              />
            </div>
            <div className="product-form-container">
              <h3>Edit Brand</h3>
              <hr />

              <Input
                label="Brand Name"
                type="text"
                id="brandName"
                value={brand.Name || ""}
                onChange={(e) => setBrand({ ...brand, Name: e.target.value })}
                required
              />

              <Input
                label="Product Image **PNG files only**"
                type="file"
                id="productImage"
                onChange={handleImageChange}
                placeholder="Product Image"
                accept="image/*"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="action-button"
              >
                {isSubmitting ? "Editing..." : "Edit Brand"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p>No product data available.</p>
      )}
    </div>
  );
}

export default EditBrand;
