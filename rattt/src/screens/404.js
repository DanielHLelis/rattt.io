import React from 'react'
// import styled from 'styled-components'
import 'styles/404.css'
import Particles from 'react-particles-js'
import ParticlesConfig from 'config/particles'

/*
    TODO:
        -Glitch
*/

export default class Error extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight
        }
    }

    componentDidMount(){
        window.addEventListener('resize', () => {
            this.setState({
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight
            })
        })
    }

    render(){
        return(
            <div className="contentDiv">
                <Particles params={ParticlesConfig['0']} className="particles" width={this.state.innerWidth} height={this.state.innerHeight}/>
                <div id="bg" >
                    <p className="blue logo rainbow giant">404</p>
                    <p className="white nf mt">Nossos ratos não encontraram a página!</p>
                </div>
            </div>
        )
    }
}