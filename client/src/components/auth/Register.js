import React, { Fragment, useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Modal,
} from "semantic-ui-react";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
  });

  const { email, password, name, surname } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name, surname };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("registered successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Modal open={true}>
        <Grid
          textAlign="center"
          style={{ height: "50vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black" textAlign="center">
              {/* <Image src="/logo.png" />  */}
              register your account
            </Header>
            <Form size="large" onSubmit={onSubmitForm}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="email address"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  type="text"
                  name="name"
                  value={name}
                  placeholder="name"
                  onChange={(e) => onChange(e)}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  type="text"
                  name="surname"
                  value={surname}
                  placeholder="surname"
                  onChange={(e) => onChange(e)}
                />
                <Button color="black" fluid size="large">
                  register
                </Button>
              </Segment>
            </Form>
            <Message>
              already have an account? <a href="/login">login</a> or{" "}
              <a href="/">see more</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Modal>
    </Fragment>
  );
};

export default Register;
