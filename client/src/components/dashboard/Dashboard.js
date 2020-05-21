import React, { useEffect, useState, Fragment } from "react";
// import { toast } from "react-toastify";
import { Header, Container } from "semantic-ui-react";

//components

import ItemsForm from "../items/ItemsForm";
import ItemsList from "../items/ItemsList";
import ItemsUser from "../items/ItemsUser";
import User from "../users/User";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [itemsChange, setItemsChange] = useState(false);
  const [id, setId] = useState("");
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      setAllItems(parseData);
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
          {/* <ItemSearchFilter /> */}
          <Header as="h1">dashboard</Header>

          <p>this is a protected admin panel</p>
          <p>inventory can be managed by user here</p>
        </Container>
        <ItemsForm setItemsChange={setItemsChange} />
        <User user_id={id} />
        <ItemsUser allItems={allItems} setItemsChange={setItemsChange} />
        <ItemsList user_id={id} user_name={name} /*otherItems={otherItems}*/ />
      </Container>
    </Fragment>
  );
};

export default Dashboard;
