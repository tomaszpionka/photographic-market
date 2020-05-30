import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Container,
  Segment,
  Header,
  Icon,
  Modal,
  Item,
  Image,
} from "semantic-ui-react";
import ItemsEdit from "./ItemsEdit";

const ItemsUser = ({ userItems, setItemsChange }) => {
  const [items, setItems] = useState([]);
  const deleteItem = async (id) => {
    try {
      await fetch(`/api/items/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token },
      });
      setItems(items.filter((item) => item.item_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setItems(userItems);
  }, [userItems]);

  return (
    <Fragment>
      <Header as="h2" attached="top" block>
        <Icon name="camera retro" />
        <Header.Content>user items</Header.Content>
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
                      <Image avatar circular src={item.user_image} />
                      <span>{item.user_email}</span>

                      <Modal
                        trigger={
                          <Button negative floated="right">
                            delete
                          </Button>
                        }
                        basic
                        size="small"
                        closeIcon
                      >
                        <Header icon="trash" content="delete item" />
                        <Modal.Content>
                          <p>
                            this will permanently delete item {item.item_id}{" "}
                            from the database, would you like to continue?
                          </p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button
                            color="green"
                            inverted
                            onClick={() => deleteItem(item.item_id)}
                          >
                            <Icon name="checkmark" /> Yes
                          </Button>
                        </Modal.Actions>
                      </Modal>
                      <ItemsEdit
                        item={item}
                        setItemsChange={setItemsChange}
                        inline
                      />
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

export default ItemsUser;
