import React, { Fragment } from "react";
import { Container, Header } from "semantic-ui-react";
import ItemsList from "./ItemsList";
import ItemsSearch from "./ItemsSearch";

const Items = () => {
  return (
    <Fragment>
      <Container style={{ marginTop: "32px" }}>
        <Container text style={{ marginTop: "7em" }}>
          <Header as="h1">items</Header>
          <p>this is a basic item market</p>
          <p>user or a visitor can see the content freely</p>
        </Container>
        <ItemsSearch />
        <ItemsList />
      </Container>
    </Fragment>
  );
};

export default Items;
