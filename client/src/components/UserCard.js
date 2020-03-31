import React, { Component } from 'react';
import {
  Card,
  Icon,
  Image,
  Button,
  Modal,
  Form,
  Message
} from 'semantic-ui-react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

class UserCard extends Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
    };
  }

  componentDidMount() {
    const usertoken = localStorage.token;
    const decoded = jwt_decode(usertoken);

    axios
      .get('/api/get/userprofilefromdb', { params: { id: decoded.sub } })
      .then(res => this.setState({ ...res.data }))
      .catch(function(error) {
        console.log(error);
      });
  }

  handleFirstNameChange = event => {
    this.setState({ name: event.target.value });
  };
  handleLastNameChange = event => {
    this.setState({ surname: event.target.value });
  };
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  updateUserDataHandler = event => {
    event.preventDefault();
    this.setState({
      formClass: 'ui loading form',
      buttonClass: 'disabled'
    });
    console.log(this.state);

    const first_name = this.state.name;
    const last_name = this.state.surname;
    const id = this.state.id;
    const data = {
      id: id,
      first_name: first_name,
      last_name: last_name
    };

    axios
      .put('/api/put/updateduserdatatodb', data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then(() =>
        this.setState({
          first_name: first_name,
          last_name: last_name,
          formClass: 'ui success form',
          buttonClass: 'hidden'
        })
      )
      .then(() =>
        setTimeout(
          () =>
            this.setState({ formClass: '', buttonClass: '', modalOpen: false }),
          3000
        )
      );
  };
  render() {
    let formButton;
    if (!this.state.buttonClass) {
      formButton = (
        <>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="First name"
              placeholder="First name"
              onChange={this.handleFirstNameChange}
            />
            <Form.Input
              fluid
              label="Last name"
              placeholder="Last name"
              onChange={this.handleLastNameChange}
            />
          </Form.Group>
          <Form.Button primary type="submit">
            Send
          </Form.Button>
        </>
      );
    } else if (this.state.buttonClass === 'disabled') {
      formButton = <Form.Button disabled>Send</Form.Button>;
    } else {
      formButton = (
        <Message success header="Success" content="User data updated" />
      );
    }
    return (
      <Card style={{ margin: '10px' }}>
        <Image
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>
            {this.state.first_name} {this.state.last_name}
          </Card.Header>
          <Card.Meta>
            Joined{' '}
            {this.state.createdAt ? this.state.createdAt.slice(0, 10) : null}
          </Card.Meta>
          <Card.Description>
            <Icon name="mail"></Icon>
            {this.state.email}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="talk" />
          Ho-ho-ho
          <br />
          <Modal
            trigger={
              <Button floated="right" inverted color="blue" onClick={this.handleOpen}>
                Edit
              </Button>
            }
            open={this.state.modalOpen}
            onClose={this.handleClose}
            content={
              <Form
                className={this.state.formClass}
                style={{ margin: '30px 50px' }}
                onSubmit={this.updateUserDataHandler}
              >
                {formButton}
              </Form>
            }
          />
        </Card.Content>
      </Card>
    );
  }
}

export default UserCard;
