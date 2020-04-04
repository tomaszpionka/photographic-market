import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Grid } from 'semantic-ui-react';

import UserCard from '../users/UserCard';
import AddItemForm from '../items/AddItemForm';
import UserItems from '../users/UserItems';

class Profile extends Component {
  constructor(props) {
    super(props);
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

export default Profile;
