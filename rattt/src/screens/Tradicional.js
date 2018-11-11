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

    _playerConfig = (divide = false, first = true) => {
        let buttons = [], {mode} = this.state;
        for(let i = 0; i < mode.length / 2 && (!divide || first); i++)
            buttons.push(
                <Button key={`l${i}`} variant="outline-primary" onClick={() => this.setPlayer(mode[i], i)}><span className="st">{`${mode[i].name} `}{this.ConfigIcon()}</span></Button>
            )
        for(let i = mode.length / 2; i < mode.length && (!divide || !first); i++)
            buttons.push(
                <Button key={`r${i}`} variant="outline-primary" onClick={() => this.setPlayer(mode[i], i)}><span className="st">{this.ConfigIcon()} {`${mode[i].name} `}</span></Button>
            )
        return buttons;
    }

    setPlayer = (player, index) => {
        let newPlayers = this.state.mode,
            handle = (e) => {
                newPlayers[index] = e;
            };

        window.ratttAlert(
            player.name, 
            <PlayerConfig index={index} players={this.state.players} handleChange={handle} player={player}/>,
            (props) => (
                <Button variant="outline-primary" onClick={() => {
                    
                    if(
                        newPlayers[index].name 
                        && newPlayers[index].name.length > 0 
                        && newPlayers[index].type 
                        && newPlayers[index].type.length > 0 
                        && newPlayers[index].symbol 
                        && newPlayers[index].symbol.length > 0
                    ){
                        PubSub.publish('reinicia');
                        this.setState({modes: newPlayers});
                        props.handleClose();
                    }else{
                        props.handleError('Todos os campos devem estar preenchidos');
                    }
                    
                }}>Aplicar</Button>
            )
        );
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