import React, { Component } from 'react'
import {
    Button
} from 'react-bootstrap'
import $ from 'jquery'
import cheet from 'cheet.js'

import 'styles/ttt.css'

import TTT from 'components/TTTGrid'

import PubSub from 'pubsub-js'

const modes = {
    local: [
        {
            name: 'Jogador 1',
            symbol: 'X',
            type: 'local',
            playing: true,
            me: true
        },
        {
            name: 'Jogador 2',
            symbol: 'O',
            type: 'bot-tradicional-impossivel',
            playing: true,
            me: false
        }
    ]
}

export default class TradicionalScreen extends Component{
    render(){
        cheet('w i n', () => {
            $('#mark').html('Winner')
        });
        return(
            <main style={{
                flexDirection: 'row'
            }} className="darkBg contentDiv">
                <TTT local={true} xSize={3} ySize={3} seq={3} players={modes.local} />
            </main>

        );
    }
}