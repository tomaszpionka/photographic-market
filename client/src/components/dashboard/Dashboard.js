import React, { useEffect, useState, Fragment } from "react";
// import { toast } from "react-toastify";
import { Header, Container } from "semantic-ui-react";

//components

import ItemsForm from "../items/ItemsForm";
import ItemsList from "../items/ItemsList";
import ItemsUser from "../items/ItemsUser";
import User from "../users/User";
import OrdersUser from "../orders/OrdersUser";
import OffersUser from "../offers/OffersUser";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [userItems, setUserItems] = useState([]);
  const [itemsChange, setItemsChange] = useState(false);
  const [id, setId] = useState("");
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      console.log(parseData);
      setUserItems(parseData);
      setId(parseData[0].user_id);
      setName(parseData[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setItemsChange(false);
  }, [itemsChange]);

  return (
    <Fragment>
      <Container>
        <Container text style={{ marginTop: "7em" }}>
          <Header as="h1">dashboard</Header>

          <p>this is a protected admin panel</p>
          <p>inventory can be managed by user here</p>
        </Container>
        <User user_id={id} />
        <OrdersUser />
        <OffersUser />
        <ItemsForm setItemsChange={setItemsChange} />

        <ItemsUser userItems={userItems} setItemsChange={setItemsChange} />
        <ItemsList user_id={id} user_name={name} />
      </Container>
    </Fragment>
  );
};

export default Dashboard;
