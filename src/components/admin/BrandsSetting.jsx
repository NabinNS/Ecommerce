import { Link } from "react-router-dom";
import service from "../../appwrite/database";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function BrandsSetting() {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState(null);

  async function deleteBrand(brandId) {
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
        setBrands((prevProducts) =>
          prevProducts.filter((brand) => brand.$id !== brandId)
        );
        try {
          await service.deleteBrand(brandId);
          await fetchBrands(); // Refetch products after deletion
        } catch (err) {
          setError("Unable to delete this brand at the moment");
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the brand. Please try again later.",
            icon: "error",
          });
        }
      }
    });
  }

  const fetchBrands = async () => {
    try {
      const response = await service.listBrands();
      if (response.documents) {
        setBrands(response.documents);
        setError(null);
      } else {
        setError("No brands found.");
      }
    } catch (err) {
      console.error("Failed to fetch brands:", err);
      setError("Unable to fetch brands. Please try again later.");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);
  return (
    <>
      <div className="add-product">
        <Link to={`../addbrands`} className="action-button">
          Add Brand
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.length === 0 && !error ? (
                <tr>
                  <td colSpan="2" className="no-products-message">
                    No brands found
                  </td>
                </tr>
              ) : (
                brands.map((brand, index) => (
                  <tr key={index}>
                    <td>{brand.Name}</td>

                    <td>
                      <Link
                        to={"../edit-brand/" + brand.$id}
                        className="action-button edit"
                      >
                        Edit
                      </Link>
                      <button
                        className="action-button"
                        onClick={() => deleteBrand(brand.$id)}
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
export default BrandsSetting;
