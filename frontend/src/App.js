import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Routes,
  Route,
  Link,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import ProductFeed from "./components/ProductFeed";
import LoginForm from "./components/LoginForm";
import Client from "./util/Client";
import ProductTile from "./components/ProductTile";
import RegisterForm from "./components/RegisterForm";
import Navbar from "./components/Navbar";

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
  {
    path: "auth/register",
    element: <RegisterForm />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
