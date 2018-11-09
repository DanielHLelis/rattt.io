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

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faSlidersH
} from '@fortawesome/free-solid-svg-icons'

import TTT from 'components/TTTGrid'
import PubSub from 'pubsub-js'

import 'styles/ttt.css'

import PlayerConfig from 'components/PlayerConfig'

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
            symbol: 'Pizza',
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

    _playerConfig = (divide = false, first = true) => {
        let buttons = [], {mode} = this.state;
        for(let i = 0; i < mode.length / 2 && (!divide || first); i++)
            buttons.push(
                <Button key={`l${i}`} size="lg" variant="outline-primary">{`${mode[i].name} `}{this.ConfigIcon()}</Button>
            )
        for(let i = mode.length / 2; i < mode.length && (!divide || !first); i++)
            buttons.push(
                <Button key={`r${i}`} size="lg" variant="outline-primary" onClick={() => this.setPlayer(mode[i], i)}>{this.ConfigIcon()} {` ${mode[i].name}`} </Button>
            )
        return buttons;
    }

    setPlayer = (player, index) => {
        window.ratttAlert(player.name, <PlayerConfig index={index} players={this.state.players} handleChange={(e) => {
            let newPlayers = this.state.mode;
            newPlayers[index] = e;
            this.setState({mode: newPlayers});
        }} player={player}/>)
    }

    ConfigIcon = (props) => <FontAwesomeIcon icon={faSlidersH}/>

    render(){
        cheet('w i n', () => {
            $('#mark').html('Winner')
        });
        return(
            <main className="darkBg contentDiv">
                <TTT local={true} leftButtons={this._playerConfig(true, true)} rightButtons={this._playerConfig(true, false)} xSize={3} ySize={3} seq={3} players={this.state.mode}/>
            </main>

        );
    }
}