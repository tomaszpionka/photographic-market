import React, { useEffect, useState, Fragment } from "react";
import { Container, Header } from "semantic-ui-react";
import ItemsList from "./ItemsList";
import ItemsSearch from "./ItemsSearch";

const Items = () => {
  const [id, setId] = useState("");
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      setId(parseData[0].user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Fragment>
      <Container style={{ marginTop: "32px" }}>
        <Container text style={{ marginTop: "7em" }}>
          <Header as="h1">items</Header>
          <p>this is a basic item market</p>
          <p>user or a visitor can see the content freely</p>
        </Container>
        <ItemsSearch />
        <ItemsList user_id={id} />
      </Container>
    </Fragment>
  );
};

export default Items;
