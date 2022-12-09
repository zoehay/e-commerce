import React from "react";

const LoginForm = () => {
  return (
    <div className="login">
      <div className="login-form">
        <form>
          <label>
            email:
            <input type="text" name="email" />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
