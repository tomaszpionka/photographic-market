import React, { useEffect, useState, Fragment } from "react";
import {
  Container,
  Header,
  Icon,
  Segment,
  Item,
  Image,
  Modal,
  Button,
} from "semantic-ui-react";

const OrdersUser = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      setName(parseData.user_name);
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
      setOrders(parseData.filter((order) => order.item_buyer === id));
    } catch (error) {
      console.log(error);
    }
  };

  const confirmOrder = async (order_id, item_buyer, item_id) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const res = await fetch(
        `http://localhost:5000/orders/confirm/${order_id}/${item_buyer}/${item_id}`,
        {
          method: "PUT",
          headers: myHeaders,
        }
      );
      // const parseData = await res.json();
      // window.location = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  const [items, setItems] = useState([]);
  const getItems = async () => {
    try {
      const res = await fetch("http://localhost:5000/items", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });
      const parseData = await res.json();
      setItems(parseData);
      console.log(parseData);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredItems = (order) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].item_id == order.item_id) {
        return (
          <Item key={order.order_id}>
            <Item.Image src={items[i].item_image_url} />
            <Item.Content>
              <Item.Header as="a">{items[i].item_name}</Item.Header>
              <Item.Meta>
                <span>
                  order placed at: {order.createdAt.slice(0, 10)}{" "}
                  {order.createdAt.slice(11, 16)}
                </span>
                <br />
                <span>order value: ${items[i].item_price}</span>
                <br />
                <span>order accepted: {order.order_process.toString()}</span>
              </Item.Meta>
              <Item.Description>{items[i].item_description}</Item.Description>
              <Item.Extra>
                <Image avatar circular src={items[i].ownerRef.user_image} />
                <span floated="right">{items[i].ownerRef.user_email}</span>

                <Modal
                  trigger={
                    order.order_success === true ? (
                      <Button positive floated="right" disabled>
                        received
                      </Button>
                    ) : order.order_process === false ? (
                      <Button secondary floated="right" disabled>
                        not sent
                      </Button>
                    ) : (
                      <Button primary floated="right">
                        confirm
                      </Button>
                    )
                  }
                  basic
                  size="small"
                >
                  <Header icon="trash" content="delete order" />
                  <Modal.Content>
                    <p>
                      this will permanently confirm order {order.order_id} ,
                      would you like to continue?
                    </p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic color="red" inverted>
                      <Icon name="remove" /> No
                    </Button>
                    <Button
                      color="green"
                      inverted
                      onClick={() =>
                        confirmOrder(
                          order.order_id,
                          order.item_buyer,
                          order.item_id
                        )
                      }
                    >
                      <Icon name="checkmark" /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Item.Extra>
            </Item.Content>
          </Item>
        );
      }
    }
  };

  useEffect(() => {
    getProfile();
    getOrders(id);
    getItems();
  }, [id]);

  return (
    <Fragment>
      <Header as="h2" attached="top" block>
        <Icon name="camera retro" />
        <Header.Content>user orders</Header.Content>
      </Header>
      <Segment attached>
        <Container>
          <Item.Group divided>
            {orders.length !== 0 &&
              orders[0].order_id !== null &&
              orders.map((order) => (
                <Fragment>{filteredItems(order)}</Fragment>
              ))}
          </Item.Group>
        </Container>
      </Segment>
    </Fragment>
  );
};

export default OrdersUser;
