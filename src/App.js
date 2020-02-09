import React from 'react';
import './App.css';

import UserPage from './pages/UserPage'
import Footer from './components/Footer'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'

function App() {
  return (
    <Router>
      <Container className="p-0" fluid={true}>
        <Navbar className="border-bottom" bg="transparent" expand="lg">
          <Navbar.Brand href="/">
            LOGO
            {/* <img
              src={logo}
              alt=""
              width="30"
              height="auto"
              className="d-inline-block align-top"
            /> */}
          </Navbar.Brand>
          <Navbar.Collapse id="navbar-toggle">
            <Nav className="ml-auto">
              <Link className="nav-link" to="/">
                Strona główna
              </Link>
              <Link className="nav-link" to="/user-page">
                Mój profil
              </Link>
              <Link className="nav-link" to="/about">
                O projekcie
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/">
            <Jumbotron >
              <h1>Witamy!</h1>
              <h1>Tu powstanie strona główna</h1>
              <p>
                <Button variant="primary">Dowiedz się więcej</Button>
              </p>
            </Jumbotron>
            
          </Route>
          <Route exact path="/user-page">
            <UserPage />
          </Route>
          <Route exact path="/about">
            <h1>Zmieniamy świat na lepsze</h1>
          </Route>
        </Switch>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
