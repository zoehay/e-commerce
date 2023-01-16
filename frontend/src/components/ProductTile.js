import React from "react";

const ProductTile = ({ product }) => {
  return (
    <div className="product-tile">
      <div className="product-image"></div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-price">{product.price}</div>
        <div className="product-description">{product.description}</div>
      </div>
    </div>
  );
};

export default ProductTile;
