import React, { useState } from "react";
import styled from "styled-components";
import Client from "../util/Client";

const Form = styled.form`
  width: 100%;
`;

const RegisterForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, name, password } = formState;
    console.log(email, name, password);
    const response = await Client.registerUser(email, name, password);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          id="password"
          value={formState.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </Form>
  );
};

export default RegisterForm;
