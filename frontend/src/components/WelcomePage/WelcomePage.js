import MainContent from "../Content/MainContent";
import PageContent from "../Content/PageContent";

const WelcomePage = () => {
  return (
    <MainContent>
      <PageContent>
        <h2 data-testid="page-name">Welcome to the store!</h2>
        <p>You can make up a user to add products to your cart</p>
      </PageContent>
    </MainContent>
  );
};

export default WelcomePage;
