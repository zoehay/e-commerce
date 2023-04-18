import { FormContent, FormLink } from "../Form";
import MainContent from "../MainContent";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <MainContent>
      <FormContent>
        <p>Create an Account</p>
        <RegisterForm />
        <FormLink to="/auth/login">Already Have An Account? Sign In</FormLink>
      </FormContent>
    </MainContent>
  );
};

export default Register;
