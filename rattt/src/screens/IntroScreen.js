import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'reactstrap'

import cheet from 'cheet.js'

import 'styles/intro.css'

class IntroScreen extends Component {
  constructor(props){
    super(props);

    this.state={
      x:window.innerWidth/2,
      y:window.innerHeight/2,
      ee: ''
    }
  }

  _setEnter = (e) => {
    window.localStorage.setItem('firstEnter', 'false');
  }

  _parallax = (e) => {
    this.setState({x: e.pageX});
    this.setState({y: e.pageY});
  }

  _backgroundPosition = (x, y) => {
    let obj = {};


    obj.backgroundPosition = Math.floor((window.innerWidth / 2 - x) * 0.1) + 'px ' + Math.floor((window.innerHeight / 2 - y) * 0.1) + 'px'
    
    return obj;
  }

  render() {
    cheet('r a t o', () => this.setState({ee: 'animation: rainbow infinite linear 0.5s;'}));
    return (
      <Filter ee={this.state.ee} style={this._backgroundPosition(this.state.x, this.state.y)} id='backgroundIntro' onMouseMove={this._parallax}>
        <div className="main">
          <p className='logo blue lt'>Rattt.io</p>
          <p className="mt white" >O site mais rato de Tic Tac Toe</p>
        </div>
        <div className="button">
          <Link onClick={this._setEnter} className="st blue" to="/main">
            <Button size='lg' color="primary" >
              Entrar
            </Button>
          </Link>
        </div>
      </Filter>
    );
  }
}

const Filter = styled.div`
  ${props=>props.ee}
`;

export default IntroScreen;
