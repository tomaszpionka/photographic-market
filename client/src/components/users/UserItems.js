import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Grid } from 'semantic-ui-react';

import ItemCard from '../items/ItemCard';

class UserItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    const usertoken = localStorage.token;
    const decoded = jwt_decode(usertoken);

    axios
      .get('/api/get/useritemsfromdb', { params: { id: decoded.sub } })
      .then(res => this.setState({ items: [...res.data] }))
      .catch(function(error) {
        console.log(error);
      });
  }
  makeItems = items => {
    return items.map(item => {
      return (
        <Grid.Column key={item.id}>
          <ItemCard itemData={item} item={item} />
        </Grid.Column>
      );
    });
  };

  render() {
    return (
      <Grid divided="vertically">
        <Grid.Row columns={2}>{this.makeItems(this.state.items)}</Grid.Row>
      </Grid>
    );
  }
}

export default UserItems;
