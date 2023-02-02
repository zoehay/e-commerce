import { useEffect, useState } from "react";
import MainContent from "../components/MainContent";
import PageContent from "../components/PageContent";
import ProductFeed from "../components/ProductFeed";
import ProductTile from "../components/ProductTile";
import Client from "../util/Client";

const Products = () => {
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
    <MainContent>
      <PageContent>
        <ProductFeed>{productTiles}</ProductFeed>
      </PageContent>
    </MainContent>
  );
};

export default Products;
