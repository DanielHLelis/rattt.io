import React, { Component } from 'react'
import {
    // ButtonToolbar,
    // ButtonGroup,
    Button,
    // Dropdown,
    // DropdownButton
} from 'react-bootstrap'
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
            type: 'bot-tradicional-impossivel',
            playing: true,
            me: false
        }
    ]
}

export default class TradicionalScreen extends Component{

    constructor(){
        super();

        this.state = {
            mode: modes.local
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
                <TTT local={true} xSize={3} ySize={3} seq={3} players={this.state.mode}>
                        <Button size='lg' variant="outline-primary" onClick={this._changeBot} >
                            Bot
                        </Button>
                        <Button size='lg' variant="outline-primary" onClick={this._changeUser} >
                            Local
                        </Button>
                </TTT>

            </main>

        );
    }
}