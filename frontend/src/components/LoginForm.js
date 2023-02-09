import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../util/userContext";

const Form = styled.form`
  width: 100%;
  margin: 1rem;
`;

const LoginForm = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formState;
    context.login(email, password);
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
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
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
        </div>

        <div>
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
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
