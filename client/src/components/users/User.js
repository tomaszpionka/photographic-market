import React, { useEffect, useState, Fragment } from "react";
import {
  Container,
  Header,
  Card,
  Image,
  Icon,
  Segment,
} from "semantic-ui-react";

import UserEdit from "./UserEdit";

const User = ({ user, setUsersChange }) => {
  const [userData, setUserData] = useState(user);
  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <Fragment>
      <Header as="h2" attached="top" block>
        <Icon name="user" />
        <Header.Content>user</Header.Content>
      </Header>
      <Segment attached>
        <Container>
          <Card>
            <Image src={userData.user_image} wrapped ui={false} />
            <Card.Content>
              <Card.Header>
                {userData.user_name} {userData.user_surname}
              </Card.Header>
              <Card.Meta>
                <span className="meta">{userData.user_email}</span>{" "}
                <span className="meta">{userData.user_phone}</span>
              </Card.Meta>
              <Card.Description>
                {userData.user_name} is currently in {userData.user_city}.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <UserEdit
                userData={userData}
                setUsersChange={setUsersChange}
                inline
              />
              {/* <span>
                <Icon name="user" />
                22 Friends
              </span> */}
            </Card.Content>
          </Card>
        </Container>
      </Segment>
    </Fragment>
  );
};

export default User;
