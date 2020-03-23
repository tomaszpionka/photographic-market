import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Grid } from 'semantic-ui-react';

class UserItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const usertoken = localStorage.token;
    const decoded = jwt_decode(usertoken);

    axios
      .get('/api/get/useritemsfromdb', { params: { id: decoded.id } })
      .then(res => this.setState({ ...res.data }))
      .catch(function(error) {
        console.log(error);
      });
    console.log(this.state)
  }
//   makeItems = items => {
//     return items.map(item => {
//       return <Card item={item} key={item.id} />;
//     });
//   };

  render() {
    return (
        <Grid.Column>
  
          {/* {this.makeItems(this.state.items)} */}
        </Grid.Column>
    );
  }
}

export default UserItems;
