import React, { useContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ErrorPage from "./routes/error-page";
import Products from "./routes/products";
import Profile from "./routes/profile";
import Root from "./routes/root";
import { UserContext, UserProvider } from "./util/userContext";

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
      {
        path: "/user",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  // const context = useContext(UserContext);
  // context.getUser();

  return (
    <div>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </div>
  );
}

export default App;
