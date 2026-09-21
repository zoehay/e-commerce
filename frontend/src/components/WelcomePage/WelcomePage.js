import styled from "styled-components";
import { NavLink } from "react-router-dom";
import MainContent from "../common/MainContent";
import PageContent from "../common/PageContent";

const Hero = styled.div`
  text-align: center;
  padding: 4rem 1rem 3rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  margin: 0 0 0.75rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-muted);
  margin: 0 0 2rem;
`;

const ShopLink = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
  font-weight: 600;
  color: #fff;
  background-color: var(--accent-bold-1);
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-sm);
  transition: background-color var(--transition-fast), transform var(--transition-fast);
  &:hover {
    background-color: var(--accent-bold-2);
    transform: translateY(-0.1rem);
  }
`;

const WelcomePage = () => {
  return (
    <MainContent>
      <PageContent>
        <Hero>
          <Title data-testid="page-name">Welcome to the store!</Title>
          <Subtitle>You can make up a user to add products to your cart</Subtitle>
          <ShopLink to="/products">Start Shopping</ShopLink>
        </Hero>
      </PageContent>
    </MainContent>
  );
};

export default WelcomePage;
