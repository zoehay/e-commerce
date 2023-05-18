import { FormContent, FormLink } from "../Form/Form";
import MainContent from "../Content/MainContent";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <MainContent>
      <FormContent>
        <h2>Create an Account</h2>
        <RegisterForm />
        <FormLink to="/auth/login" alt="login">
          Already Have An Account? Sign In
        </FormLink>
      </FormContent>
    </MainContent>
  );
};

export default Register;
