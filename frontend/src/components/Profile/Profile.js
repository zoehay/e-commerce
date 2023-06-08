import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import MainContent from "../common/MainContent";
import PageContent from "../common/PageContent";
import { EmailForm, NameForm, PasswordForm } from "./UserForm";
import { UserContext } from "../../util/userContext";

const ProfileContainer = styled.div`
  display: flex;
  margin: 0 0 auto 10%;
  flex-direction: column;
  width: 100%;
  @media (min-width: 46rem) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 auto;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
`;

const FieldTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: var(--accent-bold-2);
  margin: 0.5rem 0rem;
`;

const EditContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const FieldValue = styled.div`
  font-size: 1rem;
  font-weight: normal;
  margin-right: 1rem;
  color: var(--accent-bold-2);
`;

const EditButton = styled.button`
  color: var(--accent-bold-2);
  font-size: 0.8rem;
  margin: 0rem;
  padding: 0rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    color: var(--accent-bold-1);
  }
`;

const ProfileContent = () => {
  const context = useContext(UserContext);
  const user = context.user;
  let [emailForm, setEmailForm] = useState(false);
  let [nameForm, setNameForm] = useState(false);
  let [passwordForm, setPasswordForm] = useState(false);

  useEffect(() => {
    context.fetchUser();
  });

  const handleEmailClick = (event) => {
    event.preventDefault();
    setEmailForm(!emailForm);
  };

  const handleNameClick = (event) => {
    event.preventDefault();
    setNameForm(!nameForm);
  };

  const handlePasswordClick = (event) => {
    event.preventDefault();
    setPasswordForm(!passwordForm);
  };

  return (
    <ProfileContainer>
      <FieldContainer>
        <FieldTitle>EMAIL</FieldTitle>
        <EditContainer>
          <FieldValue data-testid="user-email">{user.email}</FieldValue>
          <EditButton onClick={handleEmailClick} alt="edit-email">
            {emailForm ? "Close" : "Edit"}
          </EditButton>
        </EditContainer>
        <EmailForm display={emailForm}></EmailForm>
      </FieldContainer>

      <FieldContainer>
        <FieldTitle>USER NAME</FieldTitle>
        <EditContainer>
          <FieldValue>{user.name || "Not Provided"}</FieldValue>
          <EditButton onClick={handleNameClick} alt="edit-name">
            {nameForm ? "Close" : "Edit"}
          </EditButton>
        </EditContainer>
        <NameForm display={nameForm}></NameForm>
      </FieldContainer>

      <FieldContainer>
        <FieldTitle>PASSWORD</FieldTitle>
        <EditContainer>
          <EditButton onClick={handlePasswordClick} alt="edit-password">
            {passwordForm ? "Close" : "Edit"}
          </EditButton>
        </EditContainer>
        <PasswordForm display={passwordForm}></PasswordForm>
      </FieldContainer>
    </ProfileContainer>
  );
};

const Profile = () => {
  const context = useContext(UserContext);
  const user = context.user;

  return (
    <MainContent>
      <PageContent>
        <h2 data-testid="page-name">Profile Details</h2>
        {user ? <ProfileContent></ProfileContent> : <h2>Loading</h2>}
      </PageContent>
    </MainContent>
  );
};

export default Profile;
