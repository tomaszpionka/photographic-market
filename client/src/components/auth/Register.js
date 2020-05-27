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

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
    city: "",
  });

  const { email, password, name, surname, phone, city } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name, surname, phone, city };
      const response = await fetch("/api/auth/register", {
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
        <Fragment>
          <Header as="h2" attached="top" block>
            <Icon name="signup" />
            <Header.Content>create account</Header.Content>
          </Header>
          <Segment attached>
            <Container>
              <Grid textAlign="center">
                <Grid.Column>
                  <Form size="large" onSubmit={onSubmitForm}>
                    <Segment stacked>
                      <Form.Input
                        fluid
                        required
                        icon="user"
                        iconPosition="left"
                        placeholder="email address"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                      />
                      <Form.Input
                        fluid
                        required
                        icon="lock"
                        iconPosition="left"
                        type="password"
                        name="password"
                        minLength="8"
                        value={password}
                        onChange={(e) => onChange(e)}
                      />
                      <Form.Input
                        fluid
                        required
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
                        required
                        icon="user"
                        iconPosition="left"
                        type="text"
                        name="surname"
                        value={surname}
                        placeholder="surname"
                        onChange={(e) => onChange(e)}
                      />
                      <Form.Input
                        fluid
                        required
                        icon="phone"
                        iconPosition="left"
                        type="text"
                        pattern="[0-9]*"
                        name="phone"
                        value={phone}
                        placeholder="phone"
                        onChange={(e) => onChange(e)}
                      />
                      <Form.Input
                        fluid
                        required
                        icon="map marker alternate"
                        iconPosition="left"
                        type="text"
                        name="city"
                        value={city}
                        placeholder="city"
                        onChange={(e) => onChange(e)}
                      />
                      <Button color="black" fluid size="large">
                        register
                      </Button>
                    </Segment>
                  </Form>
                  <Message>
                    already have an account? <a href="/-login">login</a> or{" "}
                    <a href="/">see more</a>
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

export default Register;
