import React, { Component } from 'react'
import PubSub from 'pubsub-js'

import {
    Button,
} from 'react-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faSlidersH
} from '@fortawesome/free-solid-svg-icons'

import TTT from 'components/TTTGrid'
import PlayerConfig from 'components/PlayerConfig'

export default class GameHandler extends Component{

    constructor(props){
        super(props);

        this.state = {
            players: props.players,
            width: props.width || 3,
            height: props.height || 3,
            sequence: props.sequence || 3,
            gravity: props.gravity || false,
            local: props.local || true,
            disabled: props.disabled || [],
            onFinish: props.onFinish,
            possiblePlayers: props.possiblePlayers || ['local']
        }
    }

    _playerConfig = (divide = false, first = true) => {
        let buttons = [], {players} = this.state;
        for(let i = 0; i < players.length / 2 && (!divide || first); i++)
            if(!players[i].disabled)
            buttons.push(
                <Button key={`l${i}`} variant="outline-primary" onClick={() => this.setPlayer(players[i], i)}><span className="st">{this.ConfigIcon()} {`${players[i].name} `}</span></Button>
            )
        for(let i = players.length / 2; i < players.length && (!divide || !first); i++)
            if(!players[i].disabled)
            buttons.push(
                <Button key={`r${i}`} variant="outline-primary" onClick={() => this.setPlayer(players[i], i)}><span className="st">{this.ConfigIcon()} {`${players[i].name} `}</span></Button>
            )
        return buttons;
    }

    setPlayer = (player, index) => {
        let newPlayers = this.state.players,
            handle = (e) => {
                newPlayers[index] = e;
            };

        window.ratttAlert(
            player.name, 
            <PlayerConfig index={index} players={this.state.players} possiblePlayers={this.state.possiblePlayers} handleChange={handle} player={player}/>,
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
                        this.setState({players: newPlayers});
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
        return(
            <main className="darkBg contentDiv">
                <TTT 
                    players={this.state.players}
                    xSize={this.state.width} 
                    ySize={this.state.height} 
                    seq={this.state.sequence} 
                    disabled={this.state.disabled} 
                    gravity={this.state.gravity} 
                    local={this.state.local} 
                    onFinish={this.state.onFinish}
                    leftButtons={this._playerConfig(true, true)} 
                    rightButtons={this._playerConfig(true, false)} 
                />
            </main>

        );
    }
}