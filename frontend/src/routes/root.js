import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Client from "../util/Client";
import ProductFeed from "../components/ProductFeed";
import ProductTile from "../components/ProductTile";

const Root = () => {
  let [products, setProducts] = useState([]);
  let [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let products = await Client.getProducts();
      setProducts(products);
    }
    fetchData();
  }, []);

  let productTiles = products.map((product, index) => (
    <ProductTile product={product} key={index} />
  ));

  return (
    <div>
      <h1>The Store</h1>
      <Navbar />
      <ProductFeed>{productTiles}</ProductFeed>
    </div>
  );
};

export default Root;
