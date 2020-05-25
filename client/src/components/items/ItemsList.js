import React, { useEffect, useState, Fragment } from "react";
import {
  Item,
  Image,
  Container,
  Header,
  Button,
  Icon,
  Segment,
  Modal,
} from "semantic-ui-react";

const ItemsList = ({ user_id }) => {
  const [items, setItems] = useState([]);
  const getItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/items", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      setItems(parseData);
    } catch (error) {
      console.log(error);
    }
  };

  const orderItem = async (item_id, item_owner, user_id) => {
    const body = { user_id };
    try {
      const res = await fetch(
        // `http://localhost:5000/items/owner/${item_id}/${item_owner}/${user_id}`,
        `http://localhost:5000/orders/${item_id}/${item_owner}/${user_id}`,
        {
          // method: "PUT",
          method: "POST",
          headers: { jwt_token: localStorage.token },
          body: JSON.stringify(body),
        }
      );
      const parseData = await res.json();
      console.log(parseData[0]);
      // window.location = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Fragment>
      <Header as="h2" attached="top" block>
        <Icon name="camera retro" />
        <Header.Content>all items</Header.Content>
      </Header>
      <Segment attached>
        <Container>
          <Item.Group divided>
            {items.length !== 0 &&
              items[0].item_id !== null &&
              items.map((item) => (
                <Item key={item.item_id}>
                  <Item.Image src={item.item_image_url} />
                  <Item.Content>
                    <Item.Header as="a">{item.item_name}</Item.Header>
                    <Item.Meta>
                      <span>
                        {item.createdAt.slice(0, 10)}{" "}
                        {item.createdAt.slice(11, 16)}
                      </span>
                      <br />
                      <span>{item.item_category}</span>
                      <br />
                      <span>${item.item_price}</span>
                    </Item.Meta>
                    <Item.Description>{item.item_description}</Item.Description>
                    <Item.Extra>
                      <Image avatar circular src={item.ownerRef.user_image} />
                      <span>{item.ownerRef.user_email}</span>
                      {item.item_owner !== user_id ? (
                        <Button
                          positive
                          floated="right"
                          onClick={() =>
                            orderItem(item.item_id, item.item_owner, user_id)
                          }
                        >
                          order
                        </Button>
                      ) : (
                        <Button negative floated="right" disabled>
                          stock
                        </Button>
                      )}
                      <Modal
                        trigger={
                          <Button primary floated="right">
                            contact
                          </Button>
                        }
                      >
                        <Modal.Header>contact</Modal.Header>
                        <Modal.Content image>
                          <Image
                            wrapped
                            size="medium"
                            src={item.ownerRef.user_image}
                          />
                          <Modal.Description>
                            <Header>
                              {item.ownerRef.user_name}{" "}
                              {item.ownerRef.user_surname}
                            </Header>
                            <Icon name="home" />
                            <p>{item.ownerRef.user_city}</p>
                            <Icon name="mail" />
                            <p>{item.ownerRef.user_email}</p>
                            <Icon name="call" />
                            <p>{item.ownerRef.user_phone}</p>
                          </Modal.Description>
                        </Modal.Content>
                      </Modal>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              ))}
          </Item.Group>
        </Container>
      </Segment>
    </Fragment>
  );
};
export default ItemsList;
