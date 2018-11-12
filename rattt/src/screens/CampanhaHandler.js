import React, { Component } from 'react'

import GameHandler from 'components/GameHandler'

import md5 from 'md5'

export default class Campanha extends Component{

    constructor(props){
        super(props);

        this.state = {
            auth: props.auth || false,
            hash: md5(window.localStorage.getItem('salt') + props._id)
        }
    }

    isTruth = () => {
        let val, target, salt = window.localStorage.getItem('salt');

        val = JSON.parse(window.localStorage.getItem('campanha'));

        if(typeof val === 'object' && val !== null){
            val = val[this.props.requires];
    
            target = md5(salt + this.props.requires);
    
            if(target === val)this.setState({auth: true});
        }

    }

    setAuth = (gs) => {
        let me = this.props.players.filter(el => el.me)[0];
        if(gs.winner && gs.winner._id === me._id){
            let val = JSON.parse(window.localStorage.getItem('campanha'));
            if(val === undefined || val === null || typeof val !== 'object')
                val = {}
            val[this.props._id] = this.state.hash;
            window.localStorage.setItem('campanha', JSON.stringify(val));
        }
    }

    Content = (props) => {
        if(!this.state.auth)
            return(
                <h1 className="mt primary ct mbAuto">Complete as fases anteriores!</h1>
            )
        else
            return(
                <GameHandler 
                    {...this.props}
                    onFinish={this.setAuth}
                />
            )
    }

    componentWillMount(){
        this.isTruth();
    }

    render(){
        return(
            <main className="contentDiv darkBg" >
                <h1 className="lt primary ct" >{this.props.name}</h1>
                <this.Content/>
            </main>
        )
    }
}