import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
      <Router>
          <header>
              <Link to={'/'}>To nothing</Link>
              <Link to={'/test'}>To test</Link>
          </header>

          <main>
              <Switch>
                  <Route exact path={'/'}>
                  <h1>Nothing</h1>
                  </Route>
                  <Route exact path={'/test'}>
                      <h1>Test</h1>
                  </Route>
              </Switch>
          </main>

      </Router>
  );
}

export default App;
