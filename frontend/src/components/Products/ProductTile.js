import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Client from "../../util/Client";
import { UserContext } from "../../util/userContext";

const Tile = styled.div`
  background: var(--bg-color-1);
  min-width: 8rem;
  padding-bottom: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: var(--shadow-sm);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition-med), box-shadow var(--transition-med);
  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: var(--shadow-lift);
  }
`;

const ProductInfo = styled.div`
  text-align: center;
  padding: 1.25rem 1rem 0;
`;

const ProductName = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.35rem;
`;

const ProductPrice = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent-bold-1);
  margin: 0 0 0.5rem;
`;

const ProductDescription = styled.p`
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0 0 1rem;
`;

const AddToCart = styled.button`
  font-size: 0.8rem;
  font-weight: 600;
  border: none;
  border-radius: 999px;
  padding: 0.55rem 1.25rem;
  background-color: var(--accent-light-2);
  cursor: pointer;
  transition: background-color var(--transition-fast), transform var(--transition-fast);
  &:hover {
    background-color: var(--accent-bold-2);
    transform: translateY(-0.05rem);
  }
`;

const LoginLink = styled(NavLink)`
  color: var(--accent-bold-1);
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 0.7rem;
  font-weight: 600;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 999px;
  background-color: var(--accent-light-2);
  padding: 0.55rem 1rem;
  width: 60%;
  max-width: 10rem;
  margin: 0rem auto;
  transition: color var(--transition-fast), background-color var(--transition-fast);
  &:hover {
    color: #fff;
    background-color: var(--accent-bold-2);
  }
`;

const ProductTile = ({ product }) => {
  const context = useContext(UserContext);
  const user = context.user;

  return (
    <Tile data-testid={`tile-product-${product.id}`}>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice data-testid={`product-price-${product.id}`}>
          {product.price}
        </ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>
        {user !== undefined ? (
          <AddToCart
            type="button"
            data-testid={`add-product-${product.id}`}
            onClick={() => {
              if (user) {
                Client.incrementCartProductQuantity(user.id, product.id);
              } else {
                alert("no user");
              }
            }}
          >
            Add to Cart
          </AddToCart>
        ) : (
          <LoginLink to="/auth/login" data-testid="login-from-tile">
            Login to Add
          </LoginLink>
        )}
      </ProductInfo>
    </Tile>
  );
};

export default ProductTile;
