import { useEffect, useState, useContext } from "react";
import ProductFeed from "../components/ProductFeed";
import ProductTile from "../components/ProductTile";
import Client from "../util/Client";
import { UserContext, UserProvider } from "../util/userContext";

const Profile = () => {
  // let [userDetails, setUserDetails] = useState({});

  const context = useContext(UserContext);
  let details = context.user;
  // useEffect(() => {
  //   async function fetchData() {
  //     let userDetails = await Client.getUser();
  //     setUserDetails(userDetails);
  //   }
  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>Account Details</h1>
      <h2>{details.email}</h2>
      <h2>{details.name}</h2>
      <h2>a button to edit</h2>
    </div>
  );
};

export default Profile;
