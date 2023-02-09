import { FormContent, FormLink } from "../components/Form";
import MainContent from "../components/MainContent";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <MainContent>
      <FormContent>
        <p>Create an Account</p>
        <RegisterForm />
        <FormLink to="/auth/login">Already have an account? Sign in</FormLink>
      </FormContent>
    </MainContent>
  );
};

export default Register;
