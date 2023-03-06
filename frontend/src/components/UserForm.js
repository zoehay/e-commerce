import React, { useState } from "react";
import styled from "styled-components";
import { FormContent, FormField } from "./Form";

const ToastDiv = styled.div`
  font-size: 1rem;
`;

const ProfileFormDiv = styled(FormContent)`
  margin: 0rem;
  padding: 0rem;
  align-items: flex-start;
`;

const Toast = ({ fieldName }) => {
  return <ToastDiv>{`${fieldName} has been updated`}</ToastDiv>;
};
//#TODO: break out into 3 different user forms, hard coded no switch
const UserForm = ({ display, fieldName, action }) => {
  const [formState, setFormState] = useState("");
  const [displayToast, setDisplayToast] = useState(false);
  const fieldString = String(fieldName).toLowerCase();

  let email = undefined;
  let userName = undefined;
  let password = undefined;

  switch (fieldName) {
    case "Email":
      email = formState;
      break;
    case "Name":
      userName = formState;
      break;
    case "Password":
      password = formState;
      break;
    default:
      throw new Error("Invalid UserForm type");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = formState;
    console.log(email, userName, password);
    const response = await action(email, userName, password);
    if (response.user[fieldString] === formState) {
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
            <label htmlFor="input">{`Update ${fieldName}`}</label>
            <div>
              <input
                type="text"
                name="input"
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

export default UserForm;
