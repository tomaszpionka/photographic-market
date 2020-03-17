import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import requireAuth from './requireAuth';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      first_name: 'default',
      last_name: 'default',
      email: 'default',
      id: 'default',
      errors: {}
    }
  }
  
  componentDidMount() {
    const usertoken = localStorage.token
    const decoded = jwt_decode(usertoken)
    if (decoded.email) {
      this.setState({
        email: decoded.email,
      })
    }
    if (decoded.id) {
      this.setState({
        id: decoded.id
      })
    }
    // this.setState({
    //   TODO
    //   first_name: decoded.first_name,
    //   last_name: decoded.last_name,
    //   etc: etc
    //   email: decoded.email,
    //   id: decoded.id
    // })
  }

  render() {
    return (
    <div>
      <table>
            <tbody>
              <tr>
                <td>email</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>id</td>
                <td>{this.state.id}</td>
              </tr>
            </tbody>
          </table>
      </div>
    );
  }
}

export default requireAuth(Profile);
