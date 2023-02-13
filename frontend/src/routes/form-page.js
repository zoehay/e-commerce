import { FormContent, FormLink } from "../components/Form";
import LoginForm from "../components/LoginForm";
import MainContent from "../components/MainContent";
import RegisterForm from "../components/RegisterForm";

const FormPage = ({ type }) => {
  let heading;
  let path;
  let message;
  let form;

  if (type == "register") {
    heading = "Create an Account";
    path = "/auth/login";
    message = "Already Have An Account? Sign In";
    form = <RegisterForm />;
  } else {
    heading = "Account Login";
    path = "/auth/register";
    message = "New here? Sign Up";
    form = <LoginForm />;
  }
  return (
    <MainContent>
      <FormContent>
        <p>{heading}</p>
        {form}
        <FormLink to={path}>{message}</FormLink>
      </FormContent>
    </MainContent>
  );
};

export default FormPage;
