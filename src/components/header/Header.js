import React, { Component } from "react";
import { MDBNavbarNav, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import { connect } from 'react-redux';
import NavBarLeft from "./NavBarLeft";
import NavBarRight from "./NavBarRight";

class Header extends Component {
  state = {
    isOpen: false
  };
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return(
        <MDBNavbar color="default-color" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">exchange</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav left>
          <NavBarLeft/>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <NavBarRight/>
        </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}
  
export default connect(mapStateToProps)(Header);


