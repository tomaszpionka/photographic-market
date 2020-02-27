import React, { Component } from 'react';
import requireAuth from './requireAuth';

class Feature extends Component {
  render() {
    return <h3>this h3 requires an account in exchange app database</h3>;
  }
}

export default requireAuth(Feature);
