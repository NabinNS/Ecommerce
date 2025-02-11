import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
import App from "./App.jsx";
import Home from "./components/Home.jsx";
import "bootstrap/dist/css/bootstrap.css";
import Products from "./components/product/Products.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import Dashboard from "./components/admin/Content.jsx";
import Sidebar from "./components/admin/Sidebar.jsx";
import Admin from "./components/admin/Admin.jsx";
import ProductsSetting from "./components/admin/ProductsSetting.jsx";
import AddProducts from "./components/admin/AddProducts.jsx";
import EditProduct from "./components/admin/EditProduct.jsx";
import CategoriesSetting from "./components/admin/BrandsSetting.jsx";
import BrandsSetting from "./components/admin/BrandsSetting.jsx";
import AddBrands from "./components/admin/AddBrands.jsx";
import EditBrand from "./components/admin/EditBrand.jsx";
import Cart from "./components/cart/Cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/profile/dashboard/:userId",
    element: <Admin />,
    children: [
      {
        path: "products",
        element: <ProductsSetting />,
      },
      {
        path: "addproducts",
        element: <AddProducts />,
      },
      {
        path: "edit-product/:productId",
        element: <EditProduct />,
      },
      {
        path: "brands",
        element: <BrandsSetting />,
      },
      {
        path: "addbrands",
        element: <AddBrands />,
      },
      {
        path: "edit-brand/:brandId",
        element: <EditBrand />,
      },
    ],
  },
  // {
  //   path: "/productlist",
  //   element: <ProductList />,
  // },
  // {
  //   path: "/productlist/:productName", //changes productnames
  //   element: <ProductList />,
  // },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
