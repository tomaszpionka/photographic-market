import React, { useEffect, useState, Fragment } from "react";
import { Container, Header } from "semantic-ui-react";

const Orders = () => {
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

  const [orders, setOrders] = useState([]);
  const getOrders = async (id) => {
    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      console.log(parseData);
      setOrders(parseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getOrders(id);
  }, [id]);

  return (
    <Fragment>
      <Container>
        <Container text style={{ marginTop: "7em" }}>
          <Header as="h1">Semantic UI React Fixed Template</Header>
          <p>
            This is a basic fixed menu template using fixed size containers.
          </p>
          <p>
            A text container is used for the main container, which is useful for
            single column layouts.
          </p>
          <p>
            welcome user: {name} with id: {id}
          </p>
          {orders.length !== 0 &&
            orders[0].order_id !== null &&
            orders.map((orders) => (
              <div key={orders.order_id}>
                <span>{orders.item_id}</span>
                <br />
                <span>{orders.item_owner}</span>
                <br />
                <span>{orders.item_buyer}</span>
                <br />
                <span>
                  {orders.createdAt.slice(0, 10)}{" "}
                  {orders.createdAt.slice(11, 16)}
                </span>
              </div>
            ))}
        </Container>
      </Container>
    </Fragment>
  );
};

export default Orders;
