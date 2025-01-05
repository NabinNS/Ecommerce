import { Link } from "react-router-dom";
import "../css/admin/ProductsSetting.css";
import service from "../../appwrite/database";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// or via CommonJS

function ProductsSetting() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch product list
  const fetchProducts = async () => {
    try {
      const response = await service.listProducts();
      if (response.documents) {
        setProducts(response.documents);
        setError(null);
      } else {
        setError("No products found.");
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Unable to fetch products. Please try again later.");
    }
  };

  // Delete product and refetch
  async function deleteProduct(productId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.$id !== productId)
        );
        try {
          await service.deleteProduct(productId);
          await fetchProducts(); // Refetch products after deletion
        } catch (err) {
          setError("Unable to delete product at the moment");
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the product. Please try again later.",
            icon: "error",
          });
        }
      }
    });
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="add-product">
        <Link to={`../addproducts`} className="action-button">
          Add Product
        </Link>
      </div>
      <div className="table-container">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Offers</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && !error ? (
                <tr>
                  <td colSpan="5" className="no-products-message">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.Name}</td>
                    <td>{product.Price}</td>
                    <td>{product.Offer ?? "N/A"}%</td>
                    <td>{product.Description}</td>
                    <td>
                      <button className="action-button view">View</button>
                      <Link
                        to={"../edit/" + product.$id}
                        className="action-button edit"
                      >
                        Edit
                      </Link>
                      <button
                        className="action-button"
                        onClick={() => deleteProduct(product.$id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ProductsSetting;
