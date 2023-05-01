import { useContext, useState } from "react";
import styled from "styled-components";
import MainContent from "../Content/MainContent";
import PageContent from "../Content/PageContent";
import { EmailForm, NameForm, PasswordForm } from "./UserForm";
import { UserContext } from "../../util/userContext";

const PageName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-bold-1);
  margin-bottom: 0pc;
`;

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

const ProfileContent = ({ user }) => {
  let [emailForm, setEmailForm] = useState(false);
  let [nameForm, setNameForm] = useState(false);
  let [passwordForm, setPasswordForm] = useState(false);

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
          <FieldValue>{user.email}</FieldValue>
          <EditButton onClick={handleEmailClick}>
            {emailForm ? "Close" : "Edit"}
          </EditButton>
        </EditContainer>
        <EmailForm display={emailForm}></EmailForm>
      </FieldContainer>

      <FieldContainer>
        <FieldTitle>USER NAME</FieldTitle>
        <EditContainer>
          <FieldValue>{user.name || "Not Provided"}</FieldValue>
          <EditButton onClick={handleNameClick}>
            {nameForm ? "Close" : "Edit"}
          </EditButton>
        </EditContainer>
        <NameForm display={nameForm}></NameForm>
      </FieldContainer>

      <FieldContainer>
        <FieldTitle>PASSWORD</FieldTitle>
        <EditContainer>
          <EditButton onClick={handlePasswordClick}>
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
        <PageName>Profile Details</PageName>
        {user ? (
          <ProfileContent user={user}></ProfileContent>
        ) : (
          <h2>Loading</h2>
        )}
      </PageContent>
    </MainContent>
  );
};

export default Profile;
