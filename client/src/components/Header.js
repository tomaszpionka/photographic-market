import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <Menu.Menu>
          <Menu.Item>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/signout">Sign out</Link>
          </Menu.Item>
        </Menu.Menu>
      );
    } else {
      return (
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/signup">Sign up</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/signin">Sign in</Link>
          </Menu.Item>
        </Menu.Menu>
      );
    }
  }

  render() {
    return (
      <Menu>
        <Menu.Item>
          <Link to="/">Project</Link>
        </Menu.Item>
        {this.renderLinks()}
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
