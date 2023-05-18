import { FormContent, FormLink } from "../Form/Form";
import LoginForm from "./LoginForm.js";
import MainContent from "../Content/MainContent";

const Login = () => {
  return (
    <MainContent>
      <FormContent>
        <h2>Account Login</h2>
        <LoginForm />
        <FormLink to="/auth/register" alt="register">
          New here? Sign Up
        </FormLink>
      </FormContent>
    </MainContent>
  );
};

export default Login;
