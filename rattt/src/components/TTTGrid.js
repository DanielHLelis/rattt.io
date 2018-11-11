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

/*
    TODO:
        -Adicionar surrender
        -Alpha-beta pruning
        -Adicionar casas disablitadas
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

    _resetMatrix = (cb = () => null) => {
        this.setState({
            matrix:{
                width: this.props.xSize,
                height: this.props.ySize,
                content: this.defineContent(this.props.xSize*this.props.ySize, null)
            }
        }, cb)
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

    _getSymbol = (_id) => {
        if(typeof _id !== 'string' && typeof _id !== 'number') return;

        let symbol;
        
        this.state.players.forEach(el => {
            if(el._id === _id)
                symbol = el.symbol;
        });
        return symbols[symbol];
    }

    _generateGrid = (w, h, El, props) => {
        let matrix = [];
        for(let i = 0; i < h; ++i){
            for(let j = 0; j < w; j++){
                let linearPos = i*w + j;

                let className = `${i === 0 ? 'block-top ' : ''}${i === h-1 ? 'block-bottom ' : ''}${j === 0 ? 'block-left ' : ''}${j === w-1 ? 'block-right ' : ''}`;

                matrix[linearPos] = <El key={`${linearPos}`} data-pos={linearPos} {...props} className={`${props.className} ${className}`} >{this._getSymbol(this.state.matrix.content[linearPos])}</El>;
            }
        }
            
        return(matrix);
    }

    /* Mechanics */

    _turn = (i, matrix, cb = () => null) => {
        if(!this.state.matrix.content[i] && (i !== null && i !== undefined) && !this.state.gameState.finished){
            matrix.content[i] = this.state.players[this.state.playing]._id; //Importante
            this.TTT.matrix = matrix.content;
            this.setState({
                playing: (this.state.playing + 1) % this.state.players.length,
                matrix: matrix,
                gameState: this.TTT.validate(matrix.content)
            }, ()=>cb(matrix));
            return true;
        }
        return false;
    }
    _handle = (e) => {
        e.preventDefault();
        let $el = $(e.target);
        let pos = $el.data('pos'), newMatrix = this.state.matrix;
        if(this.state.players[this.state.playing].me)
            this._turn(pos, newMatrix, this._botPlay);
    }
    _restart = (e) => { //RESTART
        this.setState({restart: true});
        setTimeout(() => this.setState({...this.state.oldState, players: this.props.players}, this._setup), 200);
    }

    _botPlay = (byMatrix, timer = 0) => {
        setTimeout(() => {
            let {players, playing, matrix} = this.state;
            let tipo = players[playing].type,
                id = players[playing]._id,
                oponentId = players[(playing + 1) % players.length]._id;    //Funciona somente 1v1
            
            if(typeof(tipo) === 'string' && tipo.includes('bot')){
                let pos = this.TTT.botPlay(id, oponentId, tipo);
                setTimeout(() => this._turn(pos, matrix, this._botPlay), 0)
            }else return;
        }, 300)
    }

    /* Core */

    /* Component */
    _setup = () => {

        this._resetMatrix(() => {
            this.TTT = new TTT({
                seq: this.state.seq,
                players: this.state.players,
                width: this.state.xSize,
                height: this.state.ySize,
                matrix: this.state.matrix.content
            });    
        });
        this._resetGameState();
        
        this._botPlay();
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
        <Grid className={this.gridClass()} x={this.state.xSize} y={this.state.ySize} onClick={this._handle}>
                {this._generateGrid(this.state.xSize, this.state.ySize, 'div', {className: `gridBlock`,symbols: {...this.state.symbols}})}
        </Grid>
    )

    Toolbar = (props) => (
        <ButtonGroup size="sm" style={{paddingTop: '1em', maxWidth: '98vw'}}>    
            {props.leftButtons}    
            {this.props.local?(
                <Button variant="outline-primary" onClick={this._restart}>
                    <span className="st" >Reiniciar</span>
                </Button>    
            ):(
                <Button variant="outline-primary" onClick={this._surrender}>
                    Desistir
                </Button>
            )}
            {props.rightButtons}
        </ButtonGroup>
    )

    /*Styles*/

    gridClass = (extra = '') => (`tttGrid ${this.state.gameState.finished ? 'reduce' : ''} ${extra}`)

    render(){
        return(
            <div className={"wrapper"} style={{marginBottom: 'auto'}}>
                {this.props.children}
                <div className={"wrapper" + (this.state.restart ? ' disappear' : '') }>
                    <TopState {...this.state} />
                    <WinnerWinnerChickenDinner local={this.props.local} _restart={this._restart} {...this.state} />
                    <this.Grid/>
                </div>
                <div className="toolbar" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <this.Toolbar leftButtons={this.props.leftButtons} rightButtons={this.props.rightButtons} />
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
    --size: ${props => 70/props.y}vmin;
    display: grid;
    overflow: hidden;
    font-weight: lighter;
    grid-template: repeat(${props => props.y}, 1fr) / repeat(${props => props.x}, 1fr);
    & * *{
        font-size: var(--size) ;
    }
    & * *.emojiIcon{
        font-size: calc(var(--size) * 0.8);
    }
    & * * *{
        font-size: calc(var(--size) * 0.65);
        height: calc(var(--size) * 0.90);
        width: calc(var(--size) * 0.90);
    }
`;