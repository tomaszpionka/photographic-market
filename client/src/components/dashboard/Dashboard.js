import React, { useEffect, useState, Fragment } from "react";
// import { toast } from "react-toastify";
import { Header, Container } from "semantic-ui-react";

//components

import ItemsForm from "../items/ItemsForm";
import ItemsList from "../items/ItemsList";
import ItemsUser from "../items/ItemsUser";

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
          <Header as="h1">Semantic UI React Fixed Template</Header>

          <p>
            This is a basic fixed menu template using fixed size containers.
          </p>
          <p>
            A text container is used for the main container, which is useful for
            single column layouts.
          </p>
        </Container>
        <ItemsForm setItemsChange={setItemsChange} />
        <ItemsUser allItems={allItems} setItemsChange={setItemsChange} />
        <ItemsList user_id={id} user_name={name} /*otherItems={otherItems}*/ />
      </Container>
    </Fragment>
  );
};

export default Dashboard;
