import logo from "./logo.svg";
import LoginForm from "./components/LoginForm";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import ProductFeed from "./components/ProductFeed";
import Client from "./util/Client";
import ProductTile from "./components/ProductTile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "auth/login",
    element: <LoginForm />,
  },
]);

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let products = await Client.getProducts();
      setProducts(products);
    }
    fetchData();
  }, []);

  const productTiles = products.map((product, index) => (
    <ProductTile product={product} key={index} />
  ));

  return (
    <div>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>

      <ProductFeed>{productTiles}</ProductFeed>
    </div>
  );
}

export default App;
