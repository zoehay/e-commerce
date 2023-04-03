import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/error-page";
import Products from "./routes/products";
import Profile from "./routes/profile";
import WelcomePage from "./components/WelcomePage";
import Root from "./routes/root";
import { UserProvider } from "./util/userContext";
import Cart from "./routes/cart";
import FormPage from "./routes/form-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <WelcomePage />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "auth/login",
        element: <FormPage type="login" />,
      },
      {
        path: "auth/register",
        element: <FormPage type="register" />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/user",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;
