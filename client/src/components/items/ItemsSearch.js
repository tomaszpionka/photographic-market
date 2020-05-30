import React, { useState, Fragment } from "react";
import {
  Container,
  Header,
  Form,
  Button,
  Item,
  Icon,
  Segment,
  Modal,
  Image,
} from "semantic-ui-react";

const ItemSearch = () => {
  const [name, setName] = useState("");
  const [query, setQuery] = useState([]);
  const [user, setUser] = useState([]);

  const onSubmitForm = async (e) => {
    if (name.length > 0) {
      try {
        const response = await fetch(`/api/items/query/?name=${name}`);
        const parsedResponse = await response.json();
        setQuery(parsedResponse);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      setQuery([]);
    }
  };
  const getUser = async (x) => {
    try {
      const response = await fetch(`/api/users/query/?name=${x}`);
      const parsedResponse = await response.json();
      setUser(parsedResponse[0]);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Header as="h2" attached="top" block>
        <Icon name="search" />
        <Header.Content>search items</Header.Content>
      </Header>
      <Segment attached>
        <Container>
          <Form
            onSubmit={() => {
              onSubmitForm();
            }}
          >
            <Form.Input>
              <input
                type="text"
                name="name"
                placeholder="search"
                value={name}
                onChange={(e) => setName(e.target.value)}
                action
              />
              <Button type="submit" primary>
                Search
              </Button>
            </Form.Input>
          </Form>

          <Item.Group divided>
            {query.length !== 0 &&
              query[0].item_id !== null &&
              query.map((item) => (
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
                      <Modal
                        trigger={
                          <Button
                            onClick={() => getUser(item.item_owner)}
                            primary
                            floated="right"
                          >
                            contact
                          </Button>
                        }
                        closeIcon
                      >
                        <Modal.Header>contact</Modal.Header>
                        <Modal.Content image>
                          <Image wrapped size="medium" src={user.user_image} />
                          <Modal.Description>
                            <Header>
                              {user.user_name} {user.user_surname}
                            </Header>
                            <Icon name="home" />
                            <p>{user.user_city}</p>
                            <Icon name="mail" />
                            <p>{user.user_email}</p>
                            <Icon name="call" />
                            <p>{user.user_phone}</p>
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

export default ItemSearch;
