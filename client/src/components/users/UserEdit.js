import React, { Fragment, useState, useEffect } from "react";
import { Button, Header, Image, Modal, Form } from "semantic-ui-react";

const UserEdit = ({ userData, setUsersChange }) => {
  const [name, setName] = useState(userData.user_name);
  const [surname, setSurname] = useState(userData.user_surname);
  const [phone, setPhone] = useState(userData.user_phone);
  const [city, setCity] = useState(userData.user_city);
  const [imageUrl, setImageUrl] = useState(userData.user_image);

  useEffect(() => {
    setName(userData.user_name);
    setSurname(userData.user_surname);
    setPhone(userData.user_phone);
    setCity(userData.user_city);
    setImageUrl(userData.user_image);
  }, [
    userData.user_name,
    userData.user_surname,
    userData.user_phone,
    userData.user_city,
    userData.user_image,
  ]);

  //editText function
  const editName = async (id) => {
    try {
      const body = { name };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`/api/users/name/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setUsersChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const editSurname = async (id) => {
    try {
      const body = { surname };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`/api/users/surname/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setUsersChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  const editPhone = async (id) => {
    try {
      const body = { phone };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`/api/users/phone/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setUsersChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  const editCity = async (id) => {
    try {
      const body = { city };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      await fetch(`/api/users/city/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setUsersChange(true);

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

      await fetch(`/api/users/image/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setUsersChange(true);

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

      <Modal open={open} onClose={closeHandler} closeIcon>
        <Modal.Header>edit user</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={userData.user_image} />
          <Modal.Description>
            <Header>user edit</Header>
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
                  minLength="2"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Field>
              <Form.Group>
                <Form.Button
                  content="update"
                  onClick={() => {
                    editName(userData.user_id);
                  }}
                />
                <Form.Button
                  content="discard"
                  negative
                  onClick={() => {
                    setName(userData.user_name);
                  }}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Field>
                <label>surname</label>
                <input
                  value={surname}
                  type="text"
                  minLength="2"
                  onChange={(e) => setSurname(e.target.value)}
                />
              </Form.Field>
              <Form.Group>
                <Form.Button
                  content="update"
                  onClick={() => {
                    editSurname(userData.user_id);
                  }}
                />
                <Form.Button
                  content="discard"
                  negative
                  onClick={() => {
                    setSurname(userData.user_surname);
                  }}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Field>
                <label>phone</label>
                <input
                  value={phone}
                  type="number"
                  min="0"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Field>
              <Form.Group>
                <Form.Button
                  content="update"
                  onClick={() => {
                    editPhone(userData.user_id);
                  }}
                />
                <Form.Button
                  content="discard"
                  negative
                  onClick={() => {
                    setPhone(userData.user_phone);
                  }}
                />
              </Form.Group>
            </Form>
            <Form>
              <Form.Field>
                <label>city</label>
                <input
                  value={city}
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Field>
              <Form.Group>
                <Form.Button
                  content="update"
                  onClick={() => {
                    editCity(userData.user_id);
                  }}
                />
                <Form.Button
                  content="discard"
                  negative
                  onClick={() => {
                    setCity(userData.user_city);
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
                    editImageUrl(userData.user_id);
                  }}
                />
                <Form.Button
                  content="discard"
                  negative
                  onClick={() => {
                    setImageUrl(userData.user_image);
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
    </Fragment>
  );
};

export default UserEdit;
