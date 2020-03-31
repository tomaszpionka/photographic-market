import React, { useEffect, useState, Fragment } from "react";
import { Container, Header, List } from "semantic-ui-react";

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

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json"
        }
      });
      const users = response.json();
      console.log(users)
      setAllUsers(users);
    }
    catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getAllUsers();
    
  }, []);
  
  return (
    <Fragment>
      <Container>
        <Container text style={{ marginTop: "7em" }}>
          <List>

          </List>
        </Container>
      </Container>
    </Fragment>
  );
};

export default Users;
