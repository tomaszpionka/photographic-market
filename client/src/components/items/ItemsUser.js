import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Container,
  Segment,
  Header,
  Icon,
  Modal,
} from "semantic-ui-react";
import ItemsEdit from "./ItemsEdit";
// import ItemsDelete from "./ItemsDelete";

const ItemsUser = ({ allItems, setItemsChange }) => {
  const [items, setItems] = useState([]); //empty array
  //   delete item function

  const deleteItem = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token },
      });
      console.log(response);
      setItems(items.filter((item) => item.item_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setItems(allItems);
  }, [allItems]);

  return (
    <Fragment>
      <Header as="h2" attached="top" block>
        <Icon name="camera retro" />
        <Header.Content>user items</Header.Content>
      </Header>
      <Segment attached>
        <Container>
          <table className="table mt-5">
            <thead>
              <tr>
                <th>Owner</th>
                <th>Description</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.length !== 0 &&
                items[0].item_id !== null &&
                items.map((item) => (
                  <tr key={item.item_id}>
                    <td>{item.user_name}</td>
                    <td>{item.item_description}</td>
                    <td>
                      <ItemsEdit item={item} setItemsChange={setItemsChange} />
                    </td>
                    <td>
                      <Modal
                        trigger={<Button>delete</Button>}
                        basic
                        size="small"
                      >
                        <Header icon="trash" content="delete item" />
                        <Modal.Content>
                          <p>
                            this will permanently delete item {item.item_id}{" "}
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
                            onClick={() => deleteItem(item.item_id)}
                          >
                            <Icon name="checkmark" /> Yes
                          </Button>
                        </Modal.Actions>
                      </Modal>
                      {/* <button
                        className="btn btn-danger"
                        onClick={() => deleteItem(item.item_id)}
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Container>
      </Segment>
    </Fragment>
  );
};

export default ItemsUser;
