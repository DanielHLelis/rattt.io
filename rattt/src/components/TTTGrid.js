import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    ButtonGroup,
    Button
} from 'react-bootstrap'
import styled from 'styled-components'
import $ from 'jquery'


import PubSub from 'pubsub-js'

import paths from 'config/paths'

import symbols from 'config/symbols'

import TTT from 'utils/TicTacToe'
import toMatrix from 'utils/objToMatrix'

/*
    TODO:
        -Adicionar surrender
        -Adicionar bots
        -Aprimorar e refatorar bots
*/
export default class TTTGrid extends Component{
    constructor(props){
        super(props);

        this.state = {
            xSize: props.xSize,
            ySize: props.ySize,
            seq: props.seq,
            players: props.players,
            playing: 0,
            used: 0,
            restart: false
        };
    }

    _resetMatrix = () => {
        this.setState({
            matrixv2:{
                width: this.props.xSize,
                height: this.props.ySize,
                content: this.defineContent(this.props.xSize*this.props.ySize, null)
            }
        })
    }
    _resetGameState = () => {
        this.setState({
            gameState: {
                blankSpaces: this.props.xSize*this.props.ySize,
                finished: false,
                winner: undefined
            }
        })
    }

    defineContent = (i, val) => {
        let res = [];
        while(i--)res.push(val);
        return res;
    }

    /* Grid */

    _getSymbol = (symbol) => symbols[symbol]

    _generateGrid = (w, h, El, props) => {
        let matrix = [];
        for(let i = 0; i < w*h; ++i)
            matrix[i] = <El key={`${i}`} data-pos={i} {...props}>{this._getSymbol(this.state.players[this.state.matrixv2.content[i]] ? this.state.players[this.state.matrixv2.content[i]].symbol : null)}</El>;
        return(matrix);
    }

    /* Mechanics */

    _turn = (i, matrix, cb = () => null) => {
        // this._moreThan1(this.state.players, (val) => this.setState({finished: val})); //SURRENDER

        if(!this.state.matrixv2.content[i] && (i !== null && i !== undefined) && !this.state.gameState.finished){
            matrix.content[i] = this.state.players[this.state.playing]._id; //Importante
            this.setState({
                playing: (this.state.playing + 1) % this.state.players.length,
                matrixv2: matrix,
                gameState: this.TTT.validate(matrix.content)
            }, ()=>cb(matrix));
            return true;
        }
        return false;
    }
    _handle = (e) => {
        e.preventDefault();
        let $el = $(e.target);
        let pos = $el.data('pos'), newMatrix = this.state.matrixv2;
        if(this.state.players[this.state.playing].me) //BOT + ONLINE
            this._turn(pos, newMatrix/*, this._botPlay*/); //Bot off
    }
    _restart = (e) => { //RESTART
        this.setState({restart: true});
        setTimeout(() => this.setState({...this.state.oldState, players: this.props.players}, this._setup), 200);
    }

    /* Core */

    /* Component */
    _setup = () => {
        this.TTT = new TTT({
            seq: this.state.seq,
            players: this.state.players,
            width: this.state.xSize,
            height: this.state.ySize
        });
        this._resetMatrix();
        this._resetGameState();

        // this._testBot(()=>{
        //     this._botPlay(this.state.matrix);
        // });
    }
    componentWillMount(){
        this._setup();
    }

    componentDidMount(){
        this.setState({oldState: this.state});
        PubSub.subscribe('reinicia', () => {
            if(this.props.local)
                this._restart();
            else
                console.error('Error! Forbidden Command')
        });
    }

    /*Clean Render*/

    Grid = () => (
        <Grid className={this.gridClass()} finished={this.state.gameState.finished} x={this.state.xSize} y={this.state.ySize} onClick={this._handle}>
                {this._generateGrid(this.state.xSize, this.state.ySize, 'div', {className: `gridBlock willReduce`,symbols: {...this.state.symbols}})}
        </Grid>
    )

    Toolbar = () => (
        <ButtonGroup style={{paddingTop: '1em'}}>        
            {this.props.local?(
                <Button size="lg" variant="outline-primary" onClick={this._restart}>
                    Reiniciar
                </Button>    
            ):(
                <Button size="lg" variant="outline-primary" onClick={this._surrender}>
                    Desistir
                </Button>
            )}
        </ButtonGroup>
    )

    /*Styles*/

    gridClass = (extra = '') => (`tttGrid ${this.state.gameState.finished ? 'reduce' : ''} ${extra}`)

    render(){
        return(
            <div style={{marginBottom: 'auto'}}>
                <div className={"wrapper" + (this.state.restart ? ' disappear' : '') }>
                    <TopState {...this.state} />
                    <WinnerWinnerChickenDinner local={this.props.local} _restart={this._restart} {...this.state} />
                    <this.Grid/>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <this.Toolbar/>
                    </div>
                    
                </div>
            </div>
        );
    }
}



const WinnerWinnerChickenDinner = props => (
    !props.gameState.finished ?(
        null
    ):(
        <div className="primary lt tttWho">
            <p>
                {(!props.gameState.winner)?('Empate!'):(`${props.gameState.winner.name} ganhou!`)}
            </p>
            <ButtonGroup>
                {props.local?(
                    <Button size="lg" variant="outline-primary" onClick={props._restart}>
                        Reiniciar
                    </Button>    
                ):(
                    null
                )}
                <Button size="lg" variant="outline-primary" as={Link} to={paths.main} href={paths.main}>
                    Voltar
                </Button>
            </ButtonGroup>
        </div>
    )
);

const TopState = props => (
    <p style={{textAlign: 'center'}} className={"lt primary" + (props.gameState.finished ? ' disappear' : '')}>
        {(!props.gameState.finished)?(
            `Vez de ${props.players[props.playing].name}!`
        ):(
            (!props.gameState.winner)?(
                'Empate!'
            ):(
                `${props.gameState.winner.name} ganhou!`
            )
        )}
    </p>
);

const Grid = styled.div`
    @media only screen and (max-width: 714px) {
        --size: ${props => 98/props.y}vw;
    }
    --size: ${props => 70/props.y}vh;
    display: grid;
    overflow: hidden;
    font-weight: lighter;
    grid-template: repeat(${props => props.y}, ${props => 100/props.y}%) / repeat(${props => props.x}, ${props => 100/props.y}%);
    & * *{
        font-size: var(--size);
    }
    & * * *{
        font-size: calc(var(--size) * 0.65);
        height: calc(var(--size) * 0.90);
        width: calc(var(--size) * 0.90);
    }
`;