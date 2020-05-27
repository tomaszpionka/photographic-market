import React, { useEffect, useState, Fragment } from "react";
import { Container, Header } from "semantic-ui-react";
import OrdersUser from "./OrdersUser";
import OffersUser from "../offers/OffersUser";

const Orders = () => {
  const [id, setId] = useState("");
  const getProfile = async () => {
    try {
      const res = await fetch("/api/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      setId(parseData[0].user_id);
    } catch (err) {
      console.error(err.message);
    }
  };

  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      setOrders(parseData);
    } catch (error) {
      console.log(error);
    }
  };

  const [items, setItems] = useState([]);
  const getItems = async () => {
    try {
      const res = await fetch("/api/items", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      setItems(parseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getOrders();
    getItems();
  }, []);

  return (
    <Fragment>
      <Container style={{ marginTop: "32px" }}>
        <Container text style={{ marginTop: "7em" }}>
          <Header as="h1">orders</Header>
          <p>this is a basic order dashboard</p>
          <p>user can see the content </p>
        </Container>
        {/* <ItemsSearch />
        <ItemsList user_id={id} /> */}
        <OrdersUser allOrders={orders} user_id={id} allItems={items} />
        <OffersUser allOrders={orders} user_id={id} allItems={items} />
      </Container>
    </Fragment>
  );
};

export default Orders;
