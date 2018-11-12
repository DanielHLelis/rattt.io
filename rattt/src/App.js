import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Master from 'screens/Master'

import Routes from 'config/routes'

import 'config/css'

class App extends Component {
  render() {
    return (
        <Router>
          <Routes Mestre={Master}/>
        </Router>
    );
  }
}

export default App;
