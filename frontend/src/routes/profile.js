import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import MainContent from "../components/MainContent";
import PageContent from "../components/PageContent";
import UserForm from "../components/UserForm";
import Client from "../util/Client";
import { UserContext } from "../util/userContext";

const PageName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-bold-1);
`;

const FieldTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: var(--accent-bold-2);
  margin: 1rem;
`;

const FieldValue = styled.div`
  font-size: 1rem;
  font-weight: normal;
  color: var(--accent-bold-2);
  margin: 1rem;
`;

const ProfileField = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileContent = styled(PageContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0rem;
  @media (min-width: 46rem) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 100%;
`;
//#TODO: Edit button to display input field
const CurrentDetails = ({ user }) => {
  return (
    <DetailsContainer>
      <div>
        <FieldTitle>EMAIL</FieldTitle>
        <FieldValue>{user.email}</FieldValue>
      </div>
      <div>
        <FieldTitle>USER NAME</FieldTitle>
        <FieldValue>{user.name || "Not Provided"}</FieldValue>
      </div>
    </DetailsContainer>
  );
};

const Profile = () => {
  let [userDetails, setUserDetails] = useState(null);

  const context = useContext(UserContext);

  const user = context.user;

  return (
    <MainContent>
      <PageContent>
        <PageName>Account Details</PageName>
        {user ? (
          <>
            <CurrentDetails user={user}></CurrentDetails>
            <ProfileContent>
              <ProfileField>
                <UserForm
                  fieldName={"Email"}
                  action={Client.updateUserProfile}
                ></UserForm>
              </ProfileField>
              <UserForm
                fieldName={"Name"}
                action={Client.updateUserProfile}
              ></UserForm>
              <UserForm
                fieldName={"Password"}
                action={Client.updateUserProfile}
              ></UserForm>
            </ProfileContent>
          </>
        ) : (
          <h2>Loading</h2>
        )}
      </PageContent>
    </MainContent>
  );
};

export default Profile;
