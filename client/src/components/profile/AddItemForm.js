import React, { Fragment, useState } from "react";
import { Card, Message, Button, Modal, Form } from "semantic-ui-react";

const AddItemForm = (props) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [modal, setModal] = useState(false);
  const [formClass, setFormClass] = useState("");
  const [buttonClass, setButtonClass] = useState("");

  const openModalHandler = () => setModal(true);
  const closeModalHandler = () => setModal(false);
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

  const addItemHandler = async (event) => {
    event.preventDefault();
    setFormClass("ui loading form");
    setButtonClass("disabled");
    const data = {
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
      // userId: userId,
    };
    try {
      const res = await fetch("https://localhost:5000/api/post/itemtodb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const parseData = await res.json();
      setFormClass("ui success form");
      setButtonClass("hidden");
      setTimeout(() => {
        setFormClass("");
        setButtonClass("");
        setModal(false);
      }, 3000);
    } catch (err) {
      console.error(err.message);
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
              value={title}
              onChange={titleChangeHandler}
            />
            <Form.Input
              required
              fluid
              label="Price"
              name="price"
              value={price}
              onChange={priceChangeHandler}
            />
          </Form.Group>
          <Form.Input
            required
            fluid
            label="Description"
            name="description"
            value={description}
            onChange={descriptionChangeHandler}
          />
          <Form.Input
            required
            fluid
            label="Image URL"
            name="imageUrl"
            value={imageUrl}
            onChange={imageUrlChangeHandler}
          />
          <Form.Button primary type="submit">
            Add item
          </Form.Button>
        </Fragment>
      );
    } else if (buttonClass === "disabled") {
      return (
        <Fragment>
          <Form.Button disabled>Add item</Form.Button>
        </Fragment>
      );
    } else {
      return (
        <Message
          success
          header="Success"
          content="Item was added to database"
        />
      );
    }
  };

  return (
    <Fragment>
      {" "}
      <Card style={{ margin: "10px" }}>
        <Modal
          trigger={
            <Button
              floated="left"
              inverted
              color="green"
              onClick={openModalHandler}
            >
              Add new item
            </Button>
          }
          open={modal}
          onClose={closeModalHandler}
          content={
            <Form
              className={formClass}
              style={{ margin: "30px 50px" }}
              onSubmit={addItemHandler}
            >
              <FormButton />
            </Form>
          }
        />
      </Card>
    </Fragment>
  );
};
export default AddItemForm;
