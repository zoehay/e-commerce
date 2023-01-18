import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
  // let [products, setProducts] = useState([]);
  let [user, setUser] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     let products = await Client.getProducts();
  //     setProducts(products);
  //   }
  //   fetchData();
  // }, []);

  // let productTiles = products.map((product, index) => (
  //   <ProductTile product={product} key={index} />
  // ));

  return (
    <div>
      <h1>The Store</h1>
      <Navbar></Navbar>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
