import React, { useEffect, useState, Fragment } from "react";
import { Container, Header } from "semantic-ui-react";
import ItemSearchFilter from "./ItemSearchFilter";
import ItemsForm from "./ItemsForm";
// import AddItemForm from "../AddItemForm";
import ItemsList from "./ItemsList";

const Items = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      setName(parseData[0].user_name);
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
      <Container>
        <Container text style={{ marginTop: "7em" }}>
          {/* <ItemSearchFilter /> */}
          <Header as="h1">Semantic UI React Fixed Template</Header>

          <p>
            This is a basic fixed menu template using fixed size containers.
          </p>
          <p>
            A text container is used for the main container, which is useful for
            single column layouts.
          </p>
        </Container>
        <ItemsList />
      </Container>
    </Fragment>
  );
};

export default Items;
