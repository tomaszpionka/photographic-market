import React, { useState } from "react";
// import jwt_decode from "jwt-decode";
import { Grid } from "semantic-ui-react";

// import requireAuth from "./requireAuth";
import UserCard from "./UserCard";
import AddItemForm from "./AddItemForm";
import UserItems from "./UserItems";

const Profile = () => {
  const [id, setId] = useState("");
  return (
    <Grid>
      <Grid.Column width={5}>
        <UserCard />
        <AddItemForm userId={id} />
      </Grid.Column>
      <Grid.Column width={10}>
        <UserItems />
      </Grid.Column>
    </Grid>
  );
};

export default Profile;
