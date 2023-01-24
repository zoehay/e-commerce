import { useEffect, useState } from "react";
import ProductFeed from "../components/ProductFeed";
import ProductTile from "../components/ProductTile";
import Client from "../util/Client";

const Profile = () => {
  let [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      let user = await Client.getUser();
      setUserDetails(user);
      console.log("profile use effect", user);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>details{userDetails.email}</h1>
    </div>
  );
};

export default Profile;
