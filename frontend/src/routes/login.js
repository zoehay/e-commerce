import { FormContent, FormLink } from "../components/Form";
import LoginForm from "../components/LoginForm";
import MainContent from "../components/MainContent";

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
