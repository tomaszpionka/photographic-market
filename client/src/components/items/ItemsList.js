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

const ItemsList = ({ user_id, user_name }) => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/items", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);
      setItems(parseData.filter((item) => item.item_owner !== user_id));
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
                      {/* </Item.Extra>
                  <Item.Extra> */}
                      {/* <Button primary floated="right">
                        Primary
                        <Icon name="chevron right" />
                      </Button> */}
                      <Modal
                        trigger={
                          <Button primary floated="right">
                            details
                          </Button>
                        }
                      >
                        <Modal.Header>details</Modal.Header>
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
