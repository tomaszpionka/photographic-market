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

const User = ({ user_id }) => {
  const [query, setQuery] = useState([]);
  const onSubmitForm = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:5000/users/query/?name=${user_id}`
      );
      const parsedResponse = await response.json();
      setQuery(parsedResponse);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Header as="h2" attached="top" block>
        <Icon name="user" />
        <Header.Content>user</Header.Content>
      </Header>
      <Segment attached>
        <Container>
          <Button onClick={onSubmitForm} primary>
            show
          </Button>

          <Item.Group divided>
            {query.length !== 0 &&
              query[0].user_id !== null &&
              query.map((item) => (
                <Item key={item.user_id}>
                  <Item.Image src={item.user_image} />
                  <Item.Content>
                    <Item.Header as="a">{item.user_name}</Item.Header>
                    <Item.Meta>
                      <span>
                        {item.createdAt.slice(0, 10)}{" "}
                        {item.createdAt.slice(11, 16)}
                      </span>
                      <br />
                      <span>{item.user_phone}</span>
                      <br />
                      <span>{item.user_city}</span>
                    </Item.Meta>
                    <Item.Description>{item.item_description}</Item.Description>
                  </Item.Content>
                </Item>
              ))}
          </Item.Group>
        </Container>
      </Segment>
    </Fragment>
  );
};

export default User;
