import React from 'react'
import Particles from 'react-particles-js'
import ParticlesConfig from 'config/particles'

export default class Plans extends React.Component{
    constructor(){
        super();

        this.state = {
            height: window.innerHeight,
            width: window.innerWidth
        }
    }

    render(){
        window.onresize = (ev) => {
            this.setState({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }
        return(
            <div className="contentDiv">
                <Particles params={ParticlesConfig['0']} className="particles" width={window.innerWidth} height={window.innerHeight}/>
                <div id="bg" >
                    <p className="primary textShadow logo giant nf">Que vázio...</p>
                    <p className="white textShadow nf mt">Algo está planejado para aparecer aqui!</p>
                </div>
            </div>
        );
    }

}