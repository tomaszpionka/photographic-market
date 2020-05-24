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

const OffersUser = () => {
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
      setOrders(parseData.filter((order) => order.item_owner === id));
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
                <Item key={order.order_id}>
                  {/* <Item.Image src={order.order_image_url} /> */}
                  <Item.Content>
                    <Item.Header as="a">{order.order_id}</Item.Header>
                    <Item.Meta>
                      <span>
                        {order.createdAt.slice(0, 10)}{" "}
                        {order.createdAt.slice(11, 16)}
                      </span>
                      <br />
                      <span>{order.item_id}</span>
                      <br />
                      <span>item owner {order.item_owner}</span>
                      <br />
                      <span>
                        item buyer {order.item_buyer} vs {id}
                      </span>
                      <br />
                      <span>{order.order_success.toString()}</span>
                    </Item.Meta>
                    <Item.Description>{order.order_success}</Item.Description>
                    <Item.Extra>
                      <Image avatar circular src={order.user_image} />
                      <span>{order.user_email}</span>

                      {/* <ItemsEdit
                        item={order}
                        setItemsChange={setItemsChange}
                        inline
                      /> */}

                      <Modal
                        trigger={<Button>delete</Button>}
                        basic
                        size="small"
                      >
                        <Header icon="trash" content="delete order" />
                        <Modal.Content>
                          <p>
                            this will permanently delete order {order.order_id}{" "}
                            from the database, would you like to continue?
                          </p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button basic color="red" inverted>
                            <Icon name="remove" /> No
                          </Button>
                          <Button
                            color="green"
                            inverted
                            // onClick={() => deleteItem(order.order_id)}
                          >
                            <Icon name="checkmark" /> Yes
                          </Button>
                        </Modal.Actions>
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

export default OffersUser;
