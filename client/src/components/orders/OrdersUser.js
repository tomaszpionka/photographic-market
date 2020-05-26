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

const OrdersUser = ({ allOrders, user_id, allItems }) => {
  const [id, setId] = useState(user_id);
  const [orders, setOrders] = useState(allOrders);

  const confirmOrder = async (order_id, item_buyer, item_id) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      await fetch(
        `http://localhost:5000/orders/confirm/${order_id}/${item_buyer}/${item_id}`,
        {
          method: "PUT",
          headers: myHeaders,
        }
      );
      window.location = "/orders";
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (order_id, item_buyer) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      await fetch(`http://localhost:5000/orders/${order_id}/${item_buyer}`, {
        method: "DELETE",
        headers: myHeaders,
      });
      // window.location = "/orders";
    } catch (error) {
      console.log(error);
    }
  };

  const [items, setItems] = useState(allItems);

  const filteredItems = (order) => {
    for (let i = 0; i < items.length; i++) {
      if (
        items[i].item_id === order.item_id &&
        order.item_buyer === id &&
        order.item_owner !== id
      ) {
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
                    order.order_process === false ? (
                      <Button negative floated="right">
                        delete
                      </Button>
                    ) : (
                      <Button negative floated="right" disabled>
                        delete
                      </Button>
                    )
                  }
                  basic
                  size="small"
                >
                  <Header icon="trash" content="delete order" />
                  <Modal.Content>
                    <p>
                      this will permanently delete order {order.order_id} ,
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
                        deleteOrder(order.order_id, order.item_buyer)
                      }
                    >
                      <Icon name="checkmark" /> Yes
                    </Button>
                  </Modal.Actions>
                </Modal>
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
    setId(user_id);
    setOrders(allOrders);
    setItems(allItems);
  }, [user_id, allOrders, allItems]);

  return (
    <Fragment>
      <Header as="h2" attached="top" block>
        <Icon name="camera retro" />
        <Header.Content>user orders {id}</Header.Content>
      </Header>
      <Segment attached>
        <Container>
          <Item.Group divided>
            {orders.length !== 0 &&
              orders[0].order_id !== null &&
              orders.map((order) => (
                <Fragment key={order.order_id}>{filteredItems(order)}</Fragment>
              ))}
          </Item.Group>
        </Container>
      </Segment>
    </Fragment>
  );
};

export default OrdersUser;
