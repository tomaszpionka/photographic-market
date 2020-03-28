import React, { Component } from 'react';
import {
  Item,
  Button,
  Modal,
  Form,
  Label,
  Message,
  Header,
  Icon
} from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SingleItem extends Component {
  constructor() {
    super();
    this.state = {
      ownerId: '',
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

  componentDidMount() {
    const id = parseInt(this.props.match.params.item_id);
    axios
      .get('/api/get/useritemfromdb', { params: { id: id } })
      .then(res => this.setState({ ...res.data }))
      .catch(function(error) {
        console.log(error);
      });
  }
  updateItemDataHandler = event => {
    event.preventDefault();
    this.setState({
      formClass: 'ui loading form',
      buttonClass: 'disabled'
    });

    const id = this.state.id;
    const title = this.state.title;
    const price = this.state.price;
    const imageUrl = this.state.imageUrl;
    const description = this.state.description;
    const data = {
      id: id,
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    };

    axios
      .put('/api/put/updateditemdatatodb', data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then(() =>
        this.setState({
          title: title,
          price: price,
          imageUrl: imageUrl,
          description: description,
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

  deleteItemDataHandler = event => {
    event.preventDefault();
    const id = parseInt(this.props.match.params.item_id);
    const history = this.props.history;
    axios
      .delete('/api/delete/useritemfromdb', { params: { id: id } })
      .then(res => this.setState({ ...res.data }))
      .catch(error => console.log(error))
      .then(() => setTimeout(() => history.push('/profile')), 1000);
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
              onChange={this.handleChange}
            />
            <Form.Input
              required
              fluid
              label="Price"
              name="price"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Input
            required
            fluid
            label="Description"
            name="description"
            onChange={this.handleChange}
          />
          <Form.Input
            required
            fluid
            label="Image URL"
            name="imageUrl"
            onChange={this.handleChange}
          />
          <Form.Button primary type="submit">
            Update item
          </Form.Button>
        </>
      );
    } else if (this.state.buttonClass === 'disabled') {
      formButton = <Form.Button disabled>Add item</Form.Button>;
    } else {
      formButton = (
        <Message success header="Success" content="Item data was updated" />
      );
    }
    return (
      <Item.Group divided>
        <Item>
          <Item.Image
            src={this.state.imageUrl}
            style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
          />
          <Item.Content>
            <Item.Header>{this.state.title}</Item.Header>
            <Item.Meta>
              <span className="user">
                <Link to={`/profile/${this.state.userId}`}>
                  <Item.Meta>
                    Item belongs to this <b>user</b>
                  </Item.Meta>
                </Link>
              </span>
            </Item.Meta>
            <Item.Description>{this.state.description}</Item.Description>
            <Item.Extra>
              <Label content={'Price: ' + this.state.price + ' USD'}></Label>
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
                      <Button
                        color="green"
                        inverted
                        onClick={this.deleteItemDataHandler}
                      >
                        <Icon name="checkmark" /> Yes
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  <Modal
                    trigger={
                      <Button inverted color="blue" onClick={this.handleOpen}>
                        Update
                      </Button>
                    }
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    content={
                      <Form
                        className={this.state.formClass}
                        style={{ margin: '30px 50px' }}
                        onSubmit={this.updateItemDataHandler}
                      >
                        {formButton}
                      </Form>
                    }
                  />
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }
}

export default SingleItem;
