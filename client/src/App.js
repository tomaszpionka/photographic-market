import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Landing from './components/Landing'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          
          <Route exact path="/" component={Landing}/>
          <div>
            
          </div>
        </div>
      </Router>
    )
  }
}

export default App;

