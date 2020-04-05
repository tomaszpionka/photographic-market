import React, { useState } from "react";
// import jwt_decode from "jwt-decode";
import { Grid } from "semantic-ui-react";

import ItemCard from "./ItemCard";

const UserItems = () => {
  const [items, setItems] = useState([]);
  const [id, setId] = useState("");

  const getUserItems = async () => {
    // { params: { id: decoded.sub } }
    try {
      const res = await fetch("/api/get/useritemsfromdb", {
        method: "GET",
      });
      const parseData = await res.json();
      setItems([...res.data]);
      // [...res.data]
    } catch (err) {
      console.log(err.message);
    }
  };

  const makeItems = (items) => {
    return items.map((item) => {
      return (
        <Grid.Column key={item.id}>
          <ItemCard itemData={item} item={item} />
        </Grid.Column>
      );
    });
  };

  return (
    <Grid divided="vertically">
      <Grid.Row columns={2}>{makeItems(items)}</Grid.Row>
    </Grid>
  );
};

export default UserItems;
