import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <div>
      <Navbar />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
