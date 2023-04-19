import React, { useContext } from "react";
import styled from "styled-components";
import Client from "../../util/Client";
import { UserContext } from "../../util/userContext";

const Tile = styled.div`
  box-sizing: border-box;
  background: var(--accent-light-1);
  padding: 1rem;
  display: grid;
  margin-bottom: 1rem;
  width: 100%;
  grid-template-columns: 1.2fr 0.8fr 1fr;
  @media (min-width: 46rem) {
    grid-template-columns: 0.75fr 1.25fr 1fr;
  }
`;

const ProductName = styled.p`
  font-size: 1rem;
`;

const ProductInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const ProductPrice = styled.div`
  font-size: 0.75rem;
  margin: 0.25rem;
  display: flex;
  align-items: center;
`;

const ProductDescription = styled.div`
  display: none;
  @media (min-width: 46rem) {
    font-size: 1rem;
    margin: 0.25rem;
    display: block;
  }
`;

const ProductQuantity = styled.div`
  display: none;
  @media (min-width: 46rem) {
    display: block;
    font-size: 1rem;
    margin: 0.25rem;
  }
`;

const SetQuantity = styled.div`
  font-size: 0.8rem;
`;

const QuantityInput = styled.input`
  width: 100%;
`;

const CartProductTile = ({ product, onChange }) => {
  const context = useContext(UserContext);
  const user = context.user;

  const handleChange = async (event) => {
    event.preventDefault();
    const newQuantity = Number(event.target.value);
    setTimeout(async () => {
      await Client.updateCartProductQuantity(
        Number(user.id),
        product.productId,
        newQuantity
      );
      await onChange(product.productId, newQuantity);
    }, 350);
  };

  return (
    <Tile>
      <ProductName>{product.product.name}</ProductName>
      <ProductInfo>
        <ProductPrice>{product.product.price}g</ProductPrice>
        <ProductDescription>{product.product.description} </ProductDescription>
        <ProductQuantity>Quantity: {product.quantity}</ProductQuantity>
      </ProductInfo>
      <SetQuantity>
        <label htmlFor="quantityInput">Quantity</label>
        <QuantityInput
          id="quantityInput"
          name="quantity"
          type="number"
          value={product.quantity}
          onChange={handleChange}
          min="0"
        />
      </SetQuantity>
    </Tile>
  );
};

export default CartProductTile;
