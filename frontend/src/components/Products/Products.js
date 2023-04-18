import { useEffect, useState } from "react";
import MainContent from "../MainContent";
import PageContent from "../PageContent";
import ProductFeed from "./ProductFeed";
import ProductTile from "./ProductTile";
import Client from "../../util/Client";

const Products = () => {
  let [products, setProducts] = useState([]);

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
    <MainContent>
      <PageContent>
        <ProductFeed>{productTiles}</ProductFeed>
      </PageContent>
    </MainContent>
  );
};

export default Products;
