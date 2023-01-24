import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div>
      <h1>The Store</h1>
      <Navbar />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
