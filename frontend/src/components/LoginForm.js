import React, { useContext, useState } from "react";
import styled from "styled-components";
import Client from "../util/Client";
import { UserContext } from "../util/userContext";

const Form = styled.form`
  width: 100%;
`;

const LoginForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const context = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formState;
    console.log(email, password);
    // Client.loginUser(email, password);
    context.login(email, password);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
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
    </div>
  );
};

export default LoginForm;
