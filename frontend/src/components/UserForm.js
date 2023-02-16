import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Client from "../util/Client";
import { FormDiv, FormField } from "./Form";

const UserForm = ({ fieldName, action }) => {
  const [formState, setFormState] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = formState;
    console.log(input);
    await action(input);
  };

  const handleChange = ({ target }) => {
    const input = target.value;
    setFormState(input);
  };

  return (
    <FormDiv>
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
    </FormDiv>
  );
};

export default UserForm;
