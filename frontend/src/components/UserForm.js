import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Client from "../util/Client";
import { FormDiv, FormField, FormContent } from "./Form";

const ToastDiv = styled.div`
  font-size: 1rem;
`;

const ProfileFormDiv = styled(FormDiv)`
  height: auto;
`;

const Toast = ({ fieldName }) => {
  return <ToastDiv>{`${fieldName} has been updated`}</ToastDiv>;
};

const UserForm = ({ fieldName, action }) => {
  const [formState, setFormState] = useState("");
  const [displayToast, setDisplayToast] = useState(false);
  const fieldString = String(fieldName).toLowerCase();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = formState;
    const response = await action(input);
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
    <FormContent>
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
    </FormContent>
  );
};

export default UserForm;
