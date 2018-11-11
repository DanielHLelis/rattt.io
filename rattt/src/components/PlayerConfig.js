import React, { Component } from 'react'

import {
    Select,
    Input
} from 'components/core/Inputs'

import Players, { findPlayer } from 'config/players'
import symbols from 'config/symbols'


export default class PlayerConfig extends Component{

    constructor(props){
        super(props);

        this.state = {
            name: props.player.name || null,
            type: props.player.type ? findPlayer(props.player.type) : null,
            symbol: props.player.symbol ? {label: props.player.symbol, value: props.player.symbol} : null
        }
    }

    handleInput = (who, e) => {
        this.setState({[who]: e.target.value});
        
        let player = this.props.player;
        player[who] = e.target.value;
        this.props.handleChange(player);
    }

    handleSelect = (who, e, value) => {
        this.setState({[who]: value});

        let player = this.props.player;
        player[who] = value.value;
        this.props.handleChange(player);
    }

    handleType = (e, value) => {
        this.setState({type: value});

        let player = this.props.player;

        if(value.value.includes('bot')){
            player.me = false;
            player.name = value.label;
            this.setState({name: value.label});
        }
        else
            player.me = true
        

        player.type = value.value;
        this.props.handleChange(player);
    }

    _symbols = () => {
        let options = []

        for(let key in symbols){
            options.push({
                label: key,
                value: key
            });
        }

        return(
            <Select label="Símbolo" placeholder="Selecione..." options={options} value={this.state.symbol} onChange={this.handleSelect.bind(this, 'symbol')} />
        )
    }

    render(){
        return(
            <div>
                <Input disabled={this.state.type ? this.state.type.value.includes('bot') : false} label="Nome" placeholder="Nome" type="text" value={this.state.name} onChange={this.handleInput.bind(this, 'name')} />
                <Select label="Tipo" placeholder="Selecione..." options={Players} value={this.state.type} onChange={this.handleType} />
                {this._symbols()}
                {this.props.children}
            </div>
        )
    }
}
