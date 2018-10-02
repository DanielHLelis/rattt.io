import React, { Component } from 'react'
// import styled from 'styled-components'
import 'styles/404.css'
import Particles from 'react-particles-js'
import ParticlesConfig from 'config/particles'

export default class NotFound extends Component{


    render(){

        return(
            <div>
                <Particles params={ParticlesConfig} className="particles" width={window.innerWidth} height={window.innerHeight}/>
                <div id="bg" >
                    <p className="blue logo nf">404</p>
                    <p className="white mt">Nossos ratos não encontraram a página!</p>
                </div>
            </div>
            
        );
    }

}