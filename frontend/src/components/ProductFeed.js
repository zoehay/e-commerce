import React from "react";

const ProductFeed = ({ children }) => {
  return (
    <div>
      <ul className="product-feed">{children}</ul>
    </div>
  );
};

export default ProductFeed;
