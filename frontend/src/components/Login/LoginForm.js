import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../util/userContext";
import { FormDiv, FormField } from "../Form/Form";

const LoginForm = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();

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
          <label htmlFor="password">Password</label>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
        </FormField>
        <FormField>
          <input type="submit" value="Submit" data-testid="login-submit" />
        </FormField>
      </form>
    </FormDiv>
  );
};

export default LoginForm;
