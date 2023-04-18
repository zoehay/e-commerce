import { FormContent, FormLink } from "../Form";
import LoginForm from "./LoginForm.js";
import MainContent from "../MainContent";

const Login = () => {
  return (
    <MainContent>
      <FormContent>
        <p>Account Login</p>
        <LoginForm />
        <FormLink to="/auth/register">New here? Sign Up</FormLink>
      </FormContent>
    </MainContent>
  );
};

export default Login;
