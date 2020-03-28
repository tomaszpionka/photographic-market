import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Grid } from 'semantic-ui-react';

import requireAuth from './requireAuth';
import UserCard from './UserCard';
import AddItemForm from './AddItemForm';
import UserItems from './UserItems';

class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const usertoken = localStorage.token;
    const decoded = jwt_decode(usertoken);
    this.setState({id: decoded.sub})
  }

  render() {
    console.log(this.props.auth.authenticated)
    return (
      <Grid>
        <Grid.Column width={5}>
          <UserCard/>
          <AddItemForm userId={this.state.id} />
        </Grid.Column>
        <Grid.Column width={10}>
          <UserItems />
        </Grid.Column>
      </Grid>
    );
  }
}

export default requireAuth(Profile);
