import { useContext, useState, useEffect } from "react";
import UserForm from "../components/UserForm";
import Client from "../util/Client";
import { UserContext } from "../util/userContext";

const Profile = () => {
  let [userDetails, setUserDetails] = useState(null);

  const context = useContext(UserContext);

  const user = context.user;

  return (
    <div>
      <h1>Account Details</h1>
      {user ? (
        <>
          <h2>{user.email}</h2>
          <h2>{user.name}</h2>
          <UserForm
            fieldName={"Name"}
            action={Client.updateUserName}
          ></UserForm>
        </>
      ) : (
        <h2>Loading</h2>
      )}
      <h2>a button to edit</h2>
    </div>
  );
};

export default Profile;
