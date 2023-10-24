import React, { useContext, useState } from "react";
import styled from "styled-components";
import Client from "../../util/Client";
import { FormContent, FormField } from "../common/Form";
import { UserContext } from "../../util/userContext";

const ToastDiv = styled.div`
  font-size: 1rem;
`;

const ProfileFormDiv = styled(FormContent)`
  margin: 0rem;
  padding: 0rem;
  align-items: flex-start;
`;

//#TODO: different toast messages for status
const Toast = ({ fieldName }) => {
  return <ToastDiv>{`${fieldName} has been updated`}</ToastDiv>;
};

export const PasswordForm = ({ display }) => {
  const fieldName = "Password";
  const [formState, setFormState] = useState("");
  const [displayToast, setDisplayToast] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await Client.updateUserPassword(formState);
    if (!response.user) {
      console.log("Could not update password");
    } else {
      setDisplayToast(true);
      setTimeout(() => {
        setDisplayToast(false);
        setFormState("");
      }, 3000);
    }
  };

  const handleChange = ({ target }) => {
    const input = target.value;
    setFormState(input);
  };

  return (
    display && (
      <ProfileFormDiv>
        {displayToast && <Toast fieldName={fieldName}></Toast>}
        <form onSubmit={handleSubmit}>
          <FormField>
            <label htmlFor="password-input">{`Update ${fieldName}`}</label>
            <div>
              <input
                type="password"
                name="password-input"
                id="input"
                value={formState}
                onChange={handleChange}
              />
            </div>
          </FormField>

          <FormField>
            <input type="submit" value="Submit" />
          </FormField>
        </form>
      </ProfileFormDiv>
    )
  );
};

export const EmailForm = ({ display, fetchUser }) => {
  const fieldName = "Email";
  const [formState, setFormState] = useState("");
  const [displayToast, setDisplayToast] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await Client.updateUserEmail(formState);
    if (!response.user.email) {
      console.log("Could not update user name");
    } else if (response.user.email === formState) {
      setDisplayToast(true);
      fetchUser();
      setTimeout(() => {
        setDisplayToast(false);
        setFormState("");
      }, 3000);
    }
  };

  const handleChange = ({ target }) => {
    const input = target.value;
    setFormState(input);
  };

  return (
    display && (
      <ProfileFormDiv>
        {displayToast && (
          <Toast fieldName={fieldName} alt="email-toast"></Toast>
        )}
        <form onSubmit={handleSubmit}>
          <FormField>
            <label htmlFor="email-input">{`Update ${fieldName}`}</label>
            <div>
              <input
                type="text"
                name="email-input"
                id="input"
                value={formState}
                onChange={handleChange}
              />
            </div>
          </FormField>
          <FormField>
            <input type="submit" value="Submit" alt="email-submit" />
          </FormField>
        </form>
      </ProfileFormDiv>
    )
  );
};

export const NameForm = ({ display, fetchUser }) => {
  const fieldName = "Name";
  const [formState, setFormState] = useState("");
  const [displayToast, setDisplayToast] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await Client.updateUserName(formState);
    if (!response.user.name) {
      console.log("Could not update user name");
    } else if (response.user.name === formState) {
      setDisplayToast(true);
      fetchUser();
      setTimeout(() => {
        setDisplayToast(false);
        setFormState("");
      }, 3000);
    }
  };

  const handleChange = ({ target }) => {
    const input = target.value;
    setFormState(input);
  };

  return (
    display && (
      <ProfileFormDiv>
        {displayToast && <Toast fieldName={fieldName}></Toast>}
        <form onSubmit={handleSubmit}>
          <FormField>
            <label htmlFor="name-input">{`Update ${fieldName}`}</label>
            <div>
              <input
                type="text"
                name="name-input"
                id="input"
                value={formState}
                onChange={handleChange}
              />
            </div>
          </FormField>
          <FormField>
            <input type="submit" value="Submit" />
          </FormField>
        </form>
      </ProfileFormDiv>
    )
  );
};
