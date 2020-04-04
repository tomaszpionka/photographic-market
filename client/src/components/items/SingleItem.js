import React, { useState, Fragment } from "react";
import {
  Item,
  Button,
  Modal,
  Form,
  Label,
  Message,
  Header,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const SingleItem = () => {
  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [modal, setModal] = useState(false);
  const [formClass, setFormClass] = useState("");
  const [buttonClass, setButtonClass] = useState("");

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const imageUrlChangeHandler = (event) => {
    setImageUrl(event.target.value);
  };
  const openModalHandler = () => setModal(true);
  const closeModalHandler = () => setModal(false);

  const getUserItem = async () => {
    // { params: { id: id } }
    let id = parseInt(this.props.match.params.item_id);
    try {
      const res = await fetch("https://localhost:5000/api/get/useritemfromdb", {
        method: "GET",
      });
      const parseData = await res.json();
      // { ...res.data } setState
    } catch (error) {
      console.log(error);
    }
  };
  const updateItemDataHandler = async (event) => {
    event.preventDefault();
    setFormClass("ui loading form");
    setButtonClass("disabled");

    const data = {
      id: id,
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    };
    try {
      const res = fetch("https://localhost:5000/api/put/updateditemdatatodb", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const parseData = await res.json();
      setTitle(title);
      setPrice(price);
      setImageUrl(imageUrl);
      setDescription(description);
      setFormClass("ui success form");
      setButtonClass("hidden");
      setTimeout(() => {
        setFormClass("");
        setButtonClass("");
        setModal(false);
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteItemDataHandler = async (event) => {
    event.preventDefault();
    // const id = parseInt(this.props.match.params.item_id);
    // const history = this.props.history;

    try {
      // { params: { id: id } }
      const res = fetch("https://localhost:5000/api/delete/useritemfromdb", {
        method: "DELETE",
      });
      const parseData = res.json();
      // { ...res.data }
      setTimeout(() => {
        window.location = "/profile";
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  const FormButton = () => {
    if (!buttonClass) {
      return (
        <Fragment>
          <Form.Group widths="equal">
            <Form.Input
              required
              fluid
              label="Title"
              name="title"
              onChange={titleChangeHandler}
            />
            <Form.Input
              required
              fluid
              label="Price"
              name="price"
              onChange={priceChangeHandler}
            />
          </Form.Group>
          <Form.Input
            required
            fluid
            label="Description"
            name="description"
            onChange={descriptionChangeHandler}
          />
          <Form.Input
            required
            fluid
            label="Image URL"
            name="imageUrl"
            onChange={imageUrlChangeHandler}
          />
          <Form.Button primary type="submit">
            Update item
          </Form.Button>
        </Fragment>
      );
    } else if (buttonClass === "disabled") {
      return <Form.Button disabled>Add item</Form.Button>;
    } else {
      return (
        <Message success header="Success" content="Item data was updated" />
      );
    }
  };
  return (
    <Item.Group divided>
      <Item>
        <Item.Image
          src={imageUrl}
          style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }}
        />
        <Item.Content>
          <Item.Header>{title}</Item.Header>
          <Item.Meta>
            <span className="user">
              <Link to={`/profile/${userId}`}>
                <Item.Meta>
                  Item belongs to this <b>user</b>
                </Item.Meta>
              </Link>
            </span>
          </Item.Meta>
          <Item.Description>{description}</Item.Description>
          <Item.Extra>
            <Label content={"Price: " + price + " USD"}></Label>
            <br />
            <Modal
              trigger={
                <Button inverted color="red">
                  Delete
                </Button>
              }
              basic
              size="small"
            >
              <Header icon="archive" content="Detele Item?" />
              <Modal.Content>
                <p>Please, confirm that you want to delete this item.</p>
              </Modal.Content>
              <Modal.Actions>
                <Button basic color="red" inverted>
                  <Icon name="remove" /> No
                </Button>
                <Button color="green" inverted onClick={deleteItemDataHandler}>
                  <Icon name="checkmark" /> Yes
                </Button>
              </Modal.Actions>
            </Modal>
            <Modal
              trigger={
                <Button inverted color="blue" onClick={openModalHandler}>
                  Update
                </Button>
              }
              open={modal}
              onClose={closeModalHandler}
              content={
                <Form
                  className={formClass}
                  style={{ margin: "30px 50px" }}
                  onSubmit={updateItemDataHandler}
                >
                  <FormButton />
                </Form>
              }
            />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default SingleItem;
