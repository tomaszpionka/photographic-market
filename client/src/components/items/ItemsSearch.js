import React, { useEffect, useState, Fragment } from "react";
import {
  Container,
  Header,
  Form,
  Button,
  Item,
  Input,
  Icon,
  Segment,
} from "semantic-ui-react";

const ItemSearch = () => {
  const [name, setName] = useState("");
  const [query, setQuery] = useState([]);
  const onSubmitForm = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:5000/items/query/?name=${name}`
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
        <Icon name="search" />
        <Header.Content>search items</Header.Content>
      </Header>
      <Segment attached>
        <Container>
          <Form onSubmit={onSubmitForm}>
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
