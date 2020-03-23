import React, { Component } from 'react';
import { Card, Icon, Image, Button, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

class AddItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        price: '',
        imageUrl: '',
        description: '',
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addItemHandler = event => {
    event.preventDefault();

    const data = {
        title: this.state.title,
        price: this.state.price,
        imageUrl: this.state.imageUrl,
        description: this.state.description,
        userId: this.props.userId,
      };

    axios
      .post('/api/post/itemtodb', data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then('do something...');
  };
  render() {
    return (
      <Card style={{ margin: '10px' }}>
        <Modal
          trigger={
            <Button floated="left" positive fluid>
              Add new item
            </Button>
          }
          content={
            <Form style={{ margin: '30px 50px' }} onSubmit={this.addItemHandler}>
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
            </Form>
          }
        />
      </Card>
    );
  }
}

export default AddItemForm;
