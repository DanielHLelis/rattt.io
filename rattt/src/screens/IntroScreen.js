import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import cheet from 'cheet.js'

import 'styles/intro.css'

class IntroScreen extends Component {
  constructor(props){
    super(props);

    this.state={
      x:0,
      y:0,
      hue: 0
    }
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
    cheet('r a t o', () => setInterval(() => {
      // window.alert('Ok');
      this.setState({hue: this.state.hue + 5});
    }, 10));
    return (
      <Filter hue={this.state.hue} style={[this._backgroundPosition(this.state.x, this.state.y), {filter: `hue-rotate(${this.state.hue}deg)`}]} id='background' onMouseMove={this._parallax}>
        <div className="main">
          <p className='logo blue lt'>Rattt.io</p>
          <p className="mt white" >O site mais rato de Tic Tac Toe</p>
        </div>
        <div className="button">
          <Link className="st blue link" to="/index">
            Entrar
          </Link>
        </div>
      </Filter>
    );
  }
}

const Filter = styled.div`
  filter: hue-rotate(${props => props.hue + 'deg'});
`;

export default IntroScreen;
