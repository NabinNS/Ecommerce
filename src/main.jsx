import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
import App from "./App.jsx";
import ProductList from "./components/product/ProductList.jsx";
import Home from "./components/Home.jsx";
import "bootstrap/dist/css/bootstrap.css";
import Products from "./components/product/Products.jsx";

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
