import React, { Fragment, useState } from "react";
import {
  Button,
  Grid,
  Header,
  Segment,
  Portal,
  Input,
  Image,
  Modal,
  Form,
} from "semantic-ui-react";

const ItemsEdit = ({ item, setItemsChange }) => {
  const [name, setName] = useState(item.item_name);
  const [description, setDescription] = useState(item.item_description);
  const [price, setPrice] = useState(item.item_price);
  const [imageUrl, setImageUrl] = useState(item.item_image_url);
  console.log(item);
  //editText function
  const editName = async (id) => {
    try {
      const body = { name };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/items/name/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setItemsChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const editDescription = async (id) => {
    try {
      const body = { description };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/items/description/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setItemsChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  const editPrice = async (id) => {
    try {
      const body = { price };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/items/price/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setItemsChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  const editImageUrl = async (id) => {
    try {
      const body = { imageUrl };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`http://localhost:5000/items/image/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setItemsChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const [open, setOpen] = useState(false);
  const closeHandler = () => {
    setOpen(false);
  };
  const openHandler = () => {
    setOpen(true);
  };

  return (
    <Fragment>
      <Button onClick={openHandler}>edit</Button>

      <Modal open={open} onClose={closeHandler}>
        <Modal.Header>edit item</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={imageUrl} />
          <Modal.Description>
            <Header>item edit</Header>
            <p>
              We've found the following gravatar image associated with your
              e-mail address.
            </p>
            <p>Is it okay to use this photo?</p>
            <Form>
              <Form.Field>
                <label>name</label>
                <input
                  value={name}
                  type="text"
                  minLength="6"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Field>
              <Form.Group>
                <Form.Button
                  content="update"
                  onClick={() => {
                    editName(item.item_id);
                  }}
                />
                <Form.Button
                  content="discard"
                  negative
                  onClick={() => {
                    setName(item.item_name);
                  }}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Field>
                <label>description</label>
                <input
                  value={description}
                  type="text"
                  minLength="6"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Field>
              <Form.Group>
                <Form.Button
                  content="update"
                  onClick={() => {
                    editDescription(item.item_id);
                  }}
                />
                <Form.Button
                  content="discard"
                  negative
                  onClick={() => {
                    setDescription(item.item_description);
                  }}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Field>
                <label>price</label>
                <input
                  value={price}
                  type="number"
                  min="0"
                  max="100"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Field>
              <Form.Group>
                <Form.Button
                  content="update"
                  onClick={() => {
                    editPrice(item.item_id);
                  }}
                />
                <Form.Button
                  content="discard"
                  negative
                  onClick={() => {
                    setPrice(item.item_price);
                  }}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Field>
                <label>imageUrl</label>
                <input
                  value={imageUrl}
                  type="url"
                  pattern="https://.*"
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </Form.Field>
              <Form.Group>
                <Form.Button
                  content="update"
                  onClick={() => {
                    editImageUrl(item.item_id);
                  }}
                />
                <Form.Button
                  content="discard"
                  negative
                  onClick={() => {
                    setImageUrl(item.item_image_url);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="alright"
            onClick={closeHandler}
          />
        </Modal.Actions>
      </Modal>

      {/* <Fragment>
      <Grid columns={2}>
        <Grid.Column>
          <Button
            content="edit"
            disabled={open}
            positive
            onClick={() => setOpen(true)}
          />

          <Portal open={open}>
            <Segment
              style={{
                left: "40%",
                position: "fixed",
                top: "50%",
                zIndex: 1000,
              }}
            >
              <Header>This is a controlled portal</Header>
              <Input>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                  content="save"
                  onClick={() => {
                    editDescription(item.item_id);
                    setOpen(false);
                  }}
                ></Button>
                <Button
                  content="close"
                  negative
                  onClick={() => {
                    setDescription(item.item_description);
                    setOpen(false);
                  }}
                />
              </Input>
            </Segment>
          </Portal>
        </Grid.Column>
      </Grid>
    </Fragment> */}
    </Fragment>
  );
};

export default ItemsEdit;
