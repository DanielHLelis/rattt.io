import React from 'react'
// import styled from 'styled-components'
import 'styles/404.css'
import Particles from 'react-particles-js'
import ParticlesConfig from 'config/particles'

/*
    TODO:
        -Glitch
*/

export default (props => (
    <div className="contentDiv">
        <Particles params={ParticlesConfig['0']} className="particles" width={window.innerWidth} height={window.innerHeight}/>
        <div id="bg" >
            <p className="blue logo rainbow giant">404</p>
            <p className="white nf mt">Nossos ratos não encontraram a página!</p>
        </div>
    </div>
));