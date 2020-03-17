import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">sign out</Link>
          <br/>
          <Link to="/profile">profile</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup">sign up</Link>
          <br/>
          <Link to="/signin">sign in</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Link to="/">project</Link>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
