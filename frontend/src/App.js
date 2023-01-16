import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import ProductFeed from "./components/ProductFeed";
import Client from "./util/Client";

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
  const [products, setProducts] = useState({});

  useEffect(() => {
    async function fetchData() {
      let products = await Client.getProducts();
      console.log(products);
    }
    fetchData();
  }, []);

  return (
    <div>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
      <div className="App">
        <div className="feed-container">
          <ProductFeed></ProductFeed>
        </div>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </div>
  );
}

export default App;
