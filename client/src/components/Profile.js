import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Grid, Image } from 'semantic-ui-react';

import requireAuth from './requireAuth';
import UserCard from './UserCard';
import AddItemForm from './AddItemForm';
import UserItems from './UserItems';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      formClassName: 'ui loading form'
    };
  }

  componentDidMount() {
    const usertoken = localStorage.token;
    const decoded = jwt_decode(usertoken);

    axios
      .get('/api/get/userprofilefromdb', { params: { email: decoded.email } })
      .then(res => this.setState({ ...res.data }))
      .catch(function(error) {
        console.log(error);
      });
  }

  handleFirstNameChange = event => {
    this.setState({ first_name: event.target.value });
  };
  handleLastNameChange = event => {
    this.setState({ last_name: event.target.value });
  };

  updateUserDataHandler = event => {
    event.preventDefault();
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
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
      .then(
        (this.setState.formClassName = {
          formClassName: 'ui success form'
        })
      );
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={4}>
          <UserCard
            onSubmit={this.updateUserDataHandler}
            onFirstNameChange={this.handleFirstNameChange}
            onLastNameChange={this.handleLastNameChange}
            userData={this.state}
            formState={this.state.formState}
          />
          <AddItemForm userId={this.state.id} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Grid.Row>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
              <UserItems/>
            </Grid.Column>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default requireAuth(Profile);
