import { useParams, useNavigate } from "react-router-dom";
import service from "../../appwrite/database";
import { useEffect, useState, useContext } from "react";
import Input from "../../Input";
import { AuthContext } from "../../AuthContext";
function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch product data
  const getProduct = async () => {
    try {
      const result = await service.getProduct(productId);
      const imageUrl = await service.getProductImage({
        productImage: result.ProductImageId,
      });
      setProduct({ ...result, ImageURL: imageUrl });
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("Unable to fetch product details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handleImageChange = (e) => {
    setProduct({ ...product, NewImage: e.target.files[0] });
  };
  // console.log(product);

  const EditProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!product.Name || !product.Price) {
        setError("Please upload necessary field.");
        return;
      }
      let newImageId = product.ProductImageId;
      if (product.NewImage) {
        const productImageData = await service.addProductImage({
          productImage: product.NewImage,
        });
        newImageId = productImageData.$id;
      }
      await service.updateProduct(productId, {
        Name: product.Name,
        Price: product.Price,
        Offer: product.Offer,
        Description: product.Description,
        ProductImageId: newImageId,
        userId: user.$id,
      });
      // Navigate back to the previous page
      navigate(-1);
    } catch (error) {
      setError("Failed to edit product. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      {product ? (
        <form onSubmit={EditProduct}>
          <div className="image-form-container">
            <div className="image-container">
              <img
                src={product.ImageURL}
                className="edit-productImage"
                alt={product.Name}
              />
            </div>
            <div className="product-form-container">
              <h3>Edit Product</h3>
              <hr />

              <Input
                label="Product Name"
                type="text"
                id="productName"
                value={product.Name || ""}
                onChange={(e) =>
                  setProduct({ ...product, Name: e.target.value })
                }
                required
              />
              <Input
                label="Price"
                type="Number"
                id="offers"
                value={product.Price || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    Price: parseInt(e.target.value, 10),
                  })
                }
                required
              />

              <Input
                label="Offers"
                type="Number"
                id="offers"
                value={product.Offer || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    Offer: parseInt(e.target.value, 10),
                  })
                }
              />
              <Input
                label="Description"
                type="Text"
                id="description"
                value={product.Description || ""}
                onChange={(e) =>
                  setProduct({ ...product, Description: e.target.value })
                }
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
                {isSubmitting ? "Editing..." : "Edit Product"}
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

export default EditProduct;
