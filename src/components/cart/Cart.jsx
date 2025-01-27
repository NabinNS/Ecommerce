import service from "../../appwrite/database";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import "../css/cart/Cart.css";
import Input from "../../Input";

function Cart() {
  const { user, setUser } = useContext(AuthContext);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const cartItems = await service.getCartItem(user.$id);

        if (cartItems.documents) {
          // Group items by ProductId and count occurrences
          const groupedItems = cartItems.documents.reduce((acc, item) => {
            acc[item.ProductId] = (acc[item.ProductId] || 0) + 1;
            return acc;
          }, {});

          // Fetch product details and include the count
          const productDetails = await Promise.all(
            Object.entries(groupedItems).map(async ([productId, count]) => {
              const product = await service.getProduct(productId);
              return {
                ...product,
                count, // Include the count for this product
              };
            })
          );

          setCartProducts(productDetails); // Set grouped products with counts
        }
      } catch (err) {
        console.error("Failed to fetch cart products:", err);
      }
    };

    if (user && user.$id) {
      getCartItems();
    }
  }, [user]);

  const deductCartProduct = async (productId) => {
    try {
      const productIndex = cartProducts.findIndex(
        (product) => product.$id === productId
      );

      if (productIndex !== -1) {
        let updatedProducts;

        if (cartProducts[productIndex].count > 1) {
          // Decrease the count of the product by 1
          updatedProducts = [...cartProducts];
          updatedProducts[productIndex].count -= 1;
        } else {
          // Remove the product from the cart entirely
          updatedProducts = cartProducts.filter(
            (product) => product.$id !== productId
          );
        }

        // Update the local state
        setCartProducts(updatedProducts);

        // Update the backend (remove item from the cart)
        await service.deleteCartItem(productId, user.$id);
        console.log("Product quantity updated in the cart.");
      }
    } catch (error) {
      console.error("Failed to remove product from the cart:", error.message);
    }
  };

  const addCartProduct = async (productId) => {
    try {
      const productIndex = cartProducts.findIndex(
        (product) => product.$id === productId
      );
      if (productIndex !== -1) {
        const updatedProducts = [...cartProducts];
        updatedProducts[productIndex].count += 1;
        setCartProducts(updatedProducts);

        await service.addToCart({ productId, userId: user.$id });
      }
    } catch (error) {
      console.error("Failed to add product to the cart:", error.message);
    }
  };

  return (
    <div>
      <div className="cart-top">
        <h4 className="cart-title">My Cart List</h4>
      </div>
      <div className="cart-detail-container">
        <div className="cart-user-detail">
          <h4>User Detail</h4>
          <hr />
          <Input label="Full Name" type="name" id="name"></Input>
          <Input label="Email" type="name" id="name"></Input>
          <Input label="Contact Number" type="name" id="name"></Input>
          <Input label="Address" type="name" id="name"></Input>
        </div>
        <div className="cart-item-detail">
          <h4>Product Detail</h4>
          <hr />
          <div className="cart-item-content">
            <div className="table-container">
              <table>
                <thead>
                  <tr className="cart-table">
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.length > 0 ? (
                    cartProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.Name}</td>
                        <td>{product.Price}</td>
                        <td>
                          <span>
                            <button
                              className="cart-quantity-button"
                              onClick={() => {
                                deductCartProduct(product.$id);
                              }}
                            >
                              -
                            </button>
                          </span>
                          {product.count}
                          <span>
                            <button
                              className="cart-quantity-button"
                              onClick={() => {
                                addCartProduct(product.$id);
                              }}
                            >
                              +
                            </button>
                          </span>
                        </td>
                        <td>{(product.Price * product.count).toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">
                        <p>Your cart is empty.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {cartProducts.length > 0 && (
              <div className="grand-total-container">
                <div className="grand-total">
                  <h4>
                    Grand Total: Rs&nbsp;
                    {cartProducts
                      .reduce((acc, product) => {
                        return acc + product.Price * product.count;
                      }, 0)
                      .toFixed(2)}
                  </h4>
                </div>
              </div>
            )}
          </div>

          <div className="cart-buttons">
            <button>Cancel</button>
            <button>Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
