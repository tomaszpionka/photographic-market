import React, { Component } from 'react';
import { Card, Message, Button, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

class AddItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: '',
      imageUrl: '',
      description: '',
      formClass: '',
      buttonClass: '',
      modalOpen: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => this.setState({ modalOpen: false });

  addItemHandler = event => {
    event.preventDefault();
    this.setState({
      formClass: 'ui loading form',
      buttonClass: 'disabled'
    });
    const data = {
      title: this.state.title,
      price: this.state.price,
      imageUrl: this.state.imageUrl,
      description: this.state.description,
      userId: this.props.userId
    };

    axios
      .post('/api/post/itemtodb', data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then(() =>
        this.setState({
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
              required
              fluid
              label="Title"
              name="title"
              value={this.title}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              fluid
              label="Price"
              name="price"
              value={this.price}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Input
            required
            fluid
            label="Description"
            name="description"
            value={this.description}
            onChange={this.handleChange}
          />
          <Form.Input
            required
            fluid
            label="Image URL"
            name="imageUrl"
            value={this.imageUrl}
            onChange={this.handleChange}
          />
          <Form.Button primary type="submit">
            Add item
          </Form.Button>
        </>
      );
    } else if (this.state.buttonClass === 'disabled') {
      formButton = <Form.Button disabled>Add item</Form.Button>;
    } else {
      formButton = (
        <Message success header="Success" content="Item was added to database" />
      );
    }
    return (
      <Card style={{ margin: '10px' }}>
        <Modal
          trigger={
            <Button
              floated="left"
              inverted
              color="green"
              onClick={this.handleOpen}
            >
              Add new item
            </Button>
          }
          open={this.state.modalOpen}
          onClose={this.handleClose}
          content={
            <Form
              className={this.state.formClass}
              style={{ margin: '30px 50px' }}
              onSubmit={this.addItemHandler}
            >
              {formButton}
            </Form>
          }
        />
      </Card>
    );
  }
}

export default AddItemForm;
