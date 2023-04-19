import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Client from "../../util/Client";
import { FormDiv, FormField } from "../Form/Form";

const RegisterForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, name, password } = formState;
    const response = await Client.registerUser(email, name, password);
    navigate("/");
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <FormDiv>
      <form onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor="email">Email</label>
          <div>
            <input
              type="text"
              name="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
        </FormField>

        <FormField>
          <label htmlFor="name">Name</label>
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={formState.name}
              onChange={handleChange}
            />
          </div>
        </FormField>

        <FormField>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type="text"
              name="password"
              id="password"
              value={formState.password}
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

export default RegisterForm;