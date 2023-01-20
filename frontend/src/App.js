import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ErrorPage from "./error-page";
import Root from "./routes/root";
import Products from "./routes/products";
import { UserProvider, currentUser } from "./util/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "auth/login",
        element: <LoginForm />,
      },
      {
        path: "auth/register",
        element: <RegisterForm />,
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
