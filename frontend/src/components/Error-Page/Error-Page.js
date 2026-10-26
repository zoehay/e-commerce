import { useRouteError } from "react-router-dom";
import styled from "styled-components";
import MainContent from "../common/MainContent";
import PageContent from "../common/PageContent";

const ErrorWrapper = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

const ErrorMessage = styled.p`
  color: var(--text-muted);
`;

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <MainContent>
      <PageContent>
        <ErrorWrapper>
          <h2>Oopsie Woopsie</h2>
          <ErrorMessage>An unexpected error has occured</ErrorMessage>
          <ErrorMessage>
            <i>{error.statusText || error.message}</i>
          </ErrorMessage>
        </ErrorWrapper>
      </PageContent>
    </MainContent>
  );
};

export default ErrorPage;
