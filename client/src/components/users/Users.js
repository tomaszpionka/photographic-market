import React, { useEffect, useState, Fragment } from "react";
import { Container, List, Form } from "semantic-ui-react";
// import SingleUser from "./SingleUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const getAllUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const parseData = await res.json();
      setUsers(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const search = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/users/find/?name=${query}`
      );

      const parseResponse = await response.json();

      setUsers(parseResponse);
      console.log(parseResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Container style={{ marginTop: "3em" }}>
        <Container text style={{ marginTop: "4em", marginBottom: "7em" }}>
          <Form onSubmit={search} fluid="true">
            <Form.Input
              type="text"
              placeholder="Search user..."
              onChange={(e) => setQuery(e.target.value)}
              action={{
                type: "submit",
                icon: "search",
                color: "primary",
                content: "Search",
              }}
            />
          </Form>
          <List divided relaxed>
            {/* {users.length === 0 ? (
              <p>Not found</p>
            ) : (
              users.map((user, i) => (
                <SingleUser key={i} redirect={() => {}} userData={user} />
              ))
            )} */}
          </List>
        </Container>
      </Container>
    </Fragment>
  );
};

export default Users;
