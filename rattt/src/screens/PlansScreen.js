import React from 'react'
// import styled from 'styled-components'
import 'styles/404.css'
import Particles from 'react-particles-js'
import ParticlesConfig from 'config/particles'

export default (props => (
    <div className="contentDiv">
        <Particles params={ParticlesConfig['1']} className="particles" width={window.innerWidth} height={window.innerHeight}/>
        <div id="bg" >
            <p className="primary textShadow logo giant nf">Que vázio...</p>
            <p className="white textShadow nf mt">Algo está planejado para aparecer aqui!</p>
        </div>
    </div>
));