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
import { toast } from "react-toastify";
const OffersUser = ({ allOrders, user_id, allItems }) => {
  const [id, setId] = useState(user_id);
  const [orders, setOrders] = useState(allOrders);
  const [items, setItems] = useState([]);

  const processOrder = async (order_id, item_id, order_process) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);
      const response = await fetch(
        `/api/orders/offer/${order_id}/${item_id}/${order_process}`,
        {
          method: "PUT",
          headers: myHeaders,
        }
      );
      const parseResponse = await response.json();
      toast.success(parseResponse);
      window.location = "/-orders";
    } catch (error) {
      console.log(error);
    }
  };

  const [users, setUsers] = useState([]);

  const search = async () => {
    try {
      const response = await fetch(`/api/users/find/?name=${""}`);
      const parseResponse = await response.json();
      setUsers(parseResponse[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getBuyer = (buyer_id) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].user_id === buyer_id) {
        return users[i].user_email;
      }
    }
  };

  const filteredItems = (order) => {
    for (let i = 0; i < items.length; i++) {
      if (
        items[i].item_id === order.item_id &&
        order.item_owner === id &&
        order.item_buyer !== id
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
                {/* <Image avatar circular src={items[i].ownerRef.user_image} />
                <span floated="right">{items[i].ownerRef.user_email}</span> */}
                <span>offer by: {getBuyer(order.item_buyer)}</span>
                <Modal
                  trigger={
                    order.order_success === true ? (
                      <Button positive floated="right" disabled>
                        received
                      </Button>
                    ) : order.order_process === false ? (
                      <Button secondary floated="right">
                        accept
                      </Button>
                    ) : (
                      <Button primary floated="right">
                        processing
                      </Button>
                    )
                  }
                  basic
                  size="small"
                  closeIcon
                >
                  <Header icon="trash" content="delete order" />
                  <Modal.Content>
                    <p>
                      this will change status of offer {order.order_id}, would
                      you like to continue?
                    </p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      color="green"
                      inverted
                      onClick={() =>
                        processOrder(
                          order.order_id,
                          order.item_id,
                          !order.order_process
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
    search();
  }, [user_id, allOrders, allItems]);

  return (
    <Fragment>
      <Header as="h2" attached="top" block>
        <Icon name="camera retro" />
        <Header.Content>user offers</Header.Content>
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

export default OffersUser;
