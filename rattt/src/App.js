import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Master from 'screens/Master'

import Routes from 'config/routes'

class App extends Component {
  render() {
    return (
        <Router>
          <Routes prefix="/" Mestre={Master}/>
        </Router>
    );
  }
}

export default App;
