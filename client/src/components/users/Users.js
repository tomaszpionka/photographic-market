import React, { useEffect, useState, Fragment } from "react";
import { Container, List, Input, Button  } from "semantic-ui-react";
import SingleUser from './SingleUser'


const Users = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token }
      });

      const parseData = await res.json();
      setName(parseData.user_name);
      setId(parseData.user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllUsers = () => {
    return fetch("http://localhost:5000/users/", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => setAllUsers(res))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Fragment>
      <Container style={{ marginTop: "3em" }}>
        <Input type="text" placeholder="Search user..." action >
          <input />
          <Button type="submit" primary icon="search"/>
        </Input>
        <Container text style={{ marginTop: "4em", marginBottom:"7em" }}>
          <List divided relaxed>
            {allUsers.map((user, i) => (
              <SingleUser key={i} redirect={() =>{}} userData={user} />
            ))}
          </List>
        </Container>
      </Container>
    </Fragment>
  );
};

export default Users;
