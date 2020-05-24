import React from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SingleUser = ({ userData, redirect }) => {
  return (
    //todo przekierować po kliknięciu na ściezkę do profilu użytkownika
    <List.Item as={Link} to="/" onClick={redirect}>
      <List.Icon name="user" size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>
          {userData.user_name} {userData.user_surname}
        </List.Header>
        <List.Description>{userData.user_email}</List.Description>
      </List.Content>
    </List.Item>
  );
};

export default SingleUser;
