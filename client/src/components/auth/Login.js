import React, { Fragment, useState } from "react";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Modal,
  Icon,
  Container,
} from "semantic-ui-react";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("/api/auth/login", {
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
        toast.success("logged in successfully");
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
        <Fragment>
          <Header as="h2" attached="top" block>
            <Icon name="sign-in" />
            <Header.Content>login</Header.Content>
          </Header>
          <Segment attached>
            <Container>
              <Grid textAlign="center">
                <Grid.Column style={{ maxWidth: 450 }}>
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
                      <Button color="black" fluid size="large">
                        Login
                      </Button>
                    </Segment>
                  </Form>
                  <Message>
                    new to us? <a href="/-register">register</a> or{" "}
                    <a href="/"> see more</a>
                  </Message>
                </Grid.Column>
              </Grid>
            </Container>
          </Segment>
        </Fragment>
      </Modal>
    </Fragment>
  );
};

export default Login;
