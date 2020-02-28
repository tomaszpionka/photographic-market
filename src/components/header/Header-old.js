import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout">sign out</Link>
          <Link to="/feature">protected_content</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup">sign up</Link>
          <Link to="/signin">sign in</Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="header">
        <Link to="/">exchange app auth</Link>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
