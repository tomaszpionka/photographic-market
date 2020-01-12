import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
//
// function TestHeader() {
//     return <h1>Test</h1>;
// }

const Test = () => (
    <div>

        Welcome to the Test route

        <Route exact path={'/test'}>
            <h1>Test number 1</h1>
        </Route>

        <Route exact path={'/test/2'}>
            <h2>Test number 2</h2>
        </Route>
    </div>
);

function App() {
  return (
      <Router>
          <header>
              <Link to={'/'}>To nothing</Link>
              <Link to={'/test'}>To the test</Link>
              <Link to={'/test/2'}>To the test number 2</Link>
          </header>

          <main>
              <Switch>
                  <Route exact path={'/'}>
                  <h1>Nothing</h1>
                  </Route>
                  <Route exact path={'/test'} component={Test}/>
              </Switch>
          </main>

      </Router>
  );
}

export default App;
