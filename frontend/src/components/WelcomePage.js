import MainContent from "./MainContent";
import PageContent from "./PageContent";

const WelcomePage = () => {
  return (
    <MainContent>
      <PageContent>
        <h2>Welcome to the store!</h2>
        <p>You can make up a user to add products to your cart</p>
      </PageContent>
    </MainContent>
  );
};

export default WelcomePage;
