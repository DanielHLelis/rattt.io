import React, { Component } from 'react'
// import {
//     // ButtonToolbar,
//     // ButtonGroup,
//     Button,
//     // Dropdown,
//     // DropdownButton
// } from 'react-bootstrap'
import $ from 'jquery'
import cheet from 'cheet.js'

import 'styles/ttt.css'

import TTT from 'components/TTTGrid'

import PubSub from 'pubsub-js'

const modes = {
    local: [
        {
            _id: '0',
            name: 'Jogador 1',
            symbol: 'X',
            type: 'local',
            playing: true,
            me: true
        },
        {   
            _id: '1',
            name: 'Jogador 2',
            symbol: 'O',
            type: 'local',
            playing: true,
            me: true
        }
    ],
    bot: [
        {   
            _id: '2',
            name: 'Jogador 1',
            symbol: 'X',
            type: 'local',
            playing: true,
            me: true
        },
        {
            _id: '3',
            name: 'Bot Rick',
            symbol: 'O',
            type: 'pro-bot',
            playing: true,
            me: false
        }
    ]
}

/*
    TODO:
        -Per player, burguer icon with player name to extend player config selection
        -Add disabled prop to prevent editing
*/

export default class TradicionalScreen extends Component{

    constructor(){
        super();

        this.state = {
            mode: modes.bot
        }
    }

    _changeBot = () => {
        this.setState({mode: modes.bot});
        PubSub.publish('reinicia');
    }
    _changeUser = () => {
        this.setState({mode: modes.local})
        PubSub.publish('reinicia');
    }

    render(){
        cheet('w i n', () => {
            $('#mark').html('Winner')
        });
        return(
            <main className="darkBg contentDiv">
                <TTT local={true} xSize={3} ySize={3} seq={3} players={this.state.mode}/>
            </main>

        );
    }
}