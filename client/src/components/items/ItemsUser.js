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

                      <ItemsEdit
                        item={item}
                        setItemsChange={setItemsChange}
                        inline
                      />

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
                    </Item.Extra>
                  </Item.Content>
                </Item>
              ))}
          </Item.Group>
        </Container>
      </Segment>
    </Fragment>

    // <Fragment>
    //   <Header as="h2" attached="top" block>
    //     <Icon name="camera retro" />
    //     <Header.Content>user items</Header.Content>
    //   </Header>
    //   <Segment attached>
    //     <Container>
    //       <table className="table mt-5">
    //         <thead>
    //           <tr>
    //             <th>Owner</th>
    //             <th>Description</th>
    //             <th></th>
    //             <th></th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {items.length !== 0 &&
    //             items[0].item_id !== null &&
    //             items.map((item) => (
    //               <tr key={item.item_id}>
    //                 <td>{item.user_name}</td>
    //                 <td>{item.item_description}</td>
    //                 <td>
    //                   <ItemsEdit item={item} setItemsChange={setItemsChange} />
    //                 </td>
    //                 <td>
    //                   <Modal
    //                     trigger={<Button>delete</Button>}
    //                     basic
    //                     size="small"
    //                   >
    //                     <Header icon="trash" content="delete item" />
    //                     <Modal.Content>
    //                       <p>
    //                         this will permanently delete item {item.item_id}{" "}
    //                         from the database, would you like to continue?
    //                       </p>
    //                     </Modal.Content>
    //                     <Modal.Actions>
    //                       <Button basic color="red" inverted>
    //                         <Icon name="remove" /> No
    //                       </Button>
    //                       <Button
    //                         color="green"
    //                         inverted
    //                         onClick={() => deleteItem(item.item_id)}
    //                       >
    //                         <Icon name="checkmark" /> Yes
    //                       </Button>
    //                     </Modal.Actions>
    //                   </Modal>
    //                 </td>
    //               </tr>
    //             ))}
    //         </tbody>
    //       </table>
    //     </Container>
    //   </Segment>
    // </Fragment>
  );
};

export default ItemsUser;
