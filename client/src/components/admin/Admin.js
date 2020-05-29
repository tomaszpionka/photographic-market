import React, { useState, useEffect, Fragment } from "react";
import {
  Header,
  Button,
  Image,
  Icon,
  Segment,
  Table,
  Container,
} from "semantic-ui-react";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState("");

  const getProfile = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const res = await fetch("/api/dashboard", {
        method: "GET",
        headers: myHeaders,
      });
      const parseData = await res.json();
      setAdmin(parseData[0].user_id);
    } catch (err) {
      console.error(err.message);
    }
  };
  const getUsers = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const res = await fetch("/api/admin/users", {
        method: "GET",
        headers: myHeaders,
      });
      const parseData = await res.json();
      setUsers(parseData.filter((user) => user.user_id !== 1));
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteUser = async (admin, id) => {
    try {
      const body = { admin };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: myHeaders,
        body: JSON.stringify(body),
      });
      setUsers(
        users.filter((user) => user.user_id !== id && user.user_id !== admin)
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    getUsers();
  }, [admin]);

  const adminCheck = (id) => {
    if (id !== 1) {
      return <Container style={{ height: "100vh" }}></Container>;
    } else {
      return (
        <Fragment>
          <Container text style={{ marginTop: "7em" }}>
            <Header as="h1">admin</Header>
            <p>this is an admin panel</p>
          </Container>
          <Header as="h2" attached="top" block>
            <Icon name="settings" />
            <Header.Content>users</Header.Content>
          </Header>
          <Segment attached>
            <Table basic="very" celled collapsing>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>user</Table.HeaderCell>
                  <Table.HeaderCell>id</Table.HeaderCell>
                  <Table.HeaderCell>email</Table.HeaderCell>
                  <Table.HeaderCell>phone</Table.HeaderCell>
                  <Table.HeaderCell>city</Table.HeaderCell>
                  <Table.HeaderCell>image</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {users.length === 0 ? (
                  <Table.Row>
                    <Table.Cell>not found</Table.Cell>
                  </Table.Row>
                ) : (
                  users.map((user, i) => (
                    <Table.Row key={i}>
                      <Table.Cell>
                        <Button
                          negative
                          onClick={() => {
                            deleteUser(id, user.user_id);
                          }}
                        >
                          delete
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Header as="h4" image>
                          <Image src={user.user_image} rounded size="mini" />
                          <Header.Content>
                            {user.user_name} {user.user_surname}
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>{user.user_id}</Table.Cell>
                      <Table.Cell>{user.user_email}</Table.Cell>
                      <Table.Cell>{user.user_phone}</Table.Cell>
                      <Table.Cell>{user.user_city}</Table.Cell>
                      <Table.Cell>
                        <a href={user.user_image}>{user.user_image}</a>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </Segment>
        </Fragment>
      );
    }
  };
  return (
    <Fragment>
      <Container>{adminCheck(admin)}</Container>
    </Fragment>
  );
};

export default Admin;
