import React, { Fragment, useState } from "react";
import {
  Card,
  Icon,
  Image,
  Button,
  Modal,
  Form,
  Message,
} from "semantic-ui-react";

const UserCard = () => {
  const [createdAt, setCreatedAt] = useState("");
  const [profile, setProfile] = useState([]);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [modal, setModal] = useState(false);
  const [formClass, setFormClass] = useState("");
  const [buttonClass, setButtonClass] = useState("");

  const getUserProfile = async () => {
    try {
      // { params: { id: decoded.sub }
      const res = await fetch(
        "https://localhost:5000/api/get/userprofilefromdb",
        {
          method: "GET",
        }
      );
      const parseData = await res.json();
      setProfile(parseData);
      //  { ...res.data }
    } catch (err) {
      console.log(err.message);
    }
  };

  const openModalHandler = () => setModal(true);
  const closeModalHandler = () => setModal(false);
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const surnameChangeHandler = (event) => {
    setSurname(event.target.value);
  };

  const updateUserDataHandler = async (event) => {
    event.preventDefault();
    setFormClass("ui loading form");
    setButtonClass("disabled");

    const first_name = name;
    const last_name = surname;
    const id = id;
    const data = {
      id: id,
      first_name: first_name,
      last_name: last_name,
    };
    try {
      const res = await fetch(
        "https://localhost:5000/api/put/updateduserdatatodb",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const parseData = await res.json();
      setName(data.first_name);
      setName(data.last_name);
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

  const FormButton = () => {
    if (!buttonClass) {
      return (
        <Fragment>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="First name"
              placeholder="First name"
              onChange={nameChangeHandler}
            />
            <Form.Input
              fluid
              label="Last name"
              placeholder="Last name"
              onChange={surnameChangeHandler}
            />
          </Form.Group>
          <Form.Button primary type="submit">
            Send
          </Form.Button>
        </Fragment>
      );
    } else if (buttonClass === "disabled") {
      return <Form.Button disabled>Send</Form.Button>;
    } else {
      return <Message success header="Success" content="User data updated" />;
    }
  };

  return (
    <Card style={{ margin: "10px" }}>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>
          {name} {surname}
        </Card.Header>
        <Card.Meta>
          Joined {createdAt ? createdAt.slice(0, 10) : null}
        </Card.Meta>
        <Card.Description>
          <Icon name="mail"></Icon>
          {email}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="talk" />
        Ho-ho-ho
        <br />
        <Modal
          trigger={
            <Button
              floated="right"
              inverted
              color="blue"
              onClick={openModalHandler}
            >
              Edit
            </Button>
          }
          open={modal}
          onClose={closeModalHandler}
          content={
            <Form
              className={formClass}
              style={{ margin: "30px 50px" }}
              onSubmit={updateUserDataHandler}
            >
              <FormButton />
            </Form>
          }
        />
      </Card.Content>
    </Card>
  );
};

export default UserCard;
