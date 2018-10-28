import React, { Component } from 'react'
import {
    ButtonGroup,
    Button
} from 'react-bootstrap'
import styled from 'styled-components'
import $ from 'jquery'

import PubSub from 'pubsub-js'

import paths from 'config/paths'

import symbols from 'config/symbols'

import TTT from 'utils/TTT'
import toMatrix from 'utils/objToMatrix'

/*
    TODO:
        -Aprimorar e refatorar bots
*/

let defineContent = (i, val) => {
    let res = [];
    while(i--)res.push(val);
    return res;
}

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
            matrix: {},
            matrixv2:{
                width: props.xSize,
                height: props.ySize,
                content: defineContent(props.xSize*props.ySize, null)
            },
            finished: -1,
            restart: false
        }
    }

    /* Grid */

    _getSymbol = (symbol) => symbols[symbol]
    _generateGrid = (x, y, El, props) => {
        let matrix = [];
        for(let i = 0; i < y; ++i){
            matrix[i] = [];
            for(let j = 0; j < x; ++j){
                console.log({pos: i*x + j, x: (i*x + j) % x, y: Math.floor((i*x + j)/ x)});
                matrix[i][j] = <El key={`${i}/${j}`} data-posy={j} data-posx={i}{...props}>{this._getSymbol(this.state.players[this.state.matrix[`${i}/${j}`]] ? this.state.players[this.state.matrix[`${i}/${j}`]].symbol : null)}</El>;
            }
        }
        return(matrix);
    }

    /* Mechanics */

    _turn = (x, y, matrix, cb = () => null) => {
        this._moreThan1(this.state.players, (val) => this.setState({finished: val})); //SURRENDER
        if(!this.state.matrix[`${x}/${y}`] && (x !== null && x !== undefined) && (y !== null && y !== undefined) && this.state.finished === -1){
            matrix[`${x}/${y}`] = this.state.playing;
            this.setState({
                playing: (this.state.playing + 1) % this.state.players.length,
                matrix: matrix,
                used: this.state.used + 1,
                finished: this.ttt().validate()
            }, ()=>cb(matrix));
            return true;
        }
        return false;
    }
    _handle = (e) => {
        e.preventDefault();
        let $el = $(e.target);
        let x = $el.data('posx'), y = $el.data('posy'), newMatrix = this.state.matrix;
        if(this.state.players[this.state.playing].me) //BOT + ONLINE
            this._turn(x, y, newMatrix, this._botPlay);
    }
    _restart = (e) => { //RESTART
        this.setState({restart: true});
        setTimeout(() => this.setState({...this.state.oldState, matrix: {}, players: this.props.players}, this._setup), 200);
    }
    _surrender = (e) => { //SURRENDER
        let newPlayers = this.state.players;
        newPlayers.forEach((el) => {
            if(el.me)el.playing = false;
        })
        this.setState({players: newPlayers});
        this._moreThan1(this.state.players, (val) => this.setState({finished: val}));
    }
    _moreThan1(obj, cb){ //SURRENDER
        if(obj.filter((el) => el.playing).length === 1){
            for(let i = 0; i < obj.length; i++){
                if(obj[i].playing){
                    cb(i);
                }
            }
        }
    }

    /* Core */

    ttt = () => new TTT(this.state.ySize, this.state.xSize, toMatrix(this.state.matrix, this.state.xSize, this.state.ySize), this.state.seq, this.state.used + 1, this.state.xSize * this.state.ySize, this.state.botIndx);

    /* Bot */
    _testBot = (cb = () => null) => { //BOT
        let indx = null;
        this.state.players.forEach((el, index) => { //BOT
            if(el.type.slice(0, 3) === 'bot'){ //BOT
                if(!indx>=0){
                    indx = index;
                }
            }
        });
        if(indx!=null){
            this.setState({botType: this.state.players[indx].type, botIndx: indx}, cb);
        }
            
    }
    _botPlay = (newMatrix) => {
        if(!this.state.players[this.state.playing].me && this.state.botType && this.state.finished === -1) //BOT
            this.ttt().jogadaComputador(this.state.botType, (X, Y) => this._turn(X, Y, newMatrix)); //BOT
    }
    _setup = () => {
        this._testBot(()=>{
            this._botPlay(this.state.matrix);
        });
    }
    /* Component */



    componentDidMount(){
        this._setup();
        this.setState({oldState: this.state});
        PubSub.subscribe('reinicia', () => {
            this._restart();
        });
    }

    render(){
        return(
            <div style={{marginBottom: 'auto'}}>
                <div className={"wrapper" + (this.state.restart ? ' disappear' : '') }>
                    <TopState {...this.state} />
                    <WinnerWinnerChickenDinner local={this.props.local} _restart={this._restart} {...this.state} />
                    <Grid className={`tttGrid` + (this.state.finished === -1 ? '' : ' reduce')} finished={this.state.finished} x={this.state.xSize} y={this.state.ySize} onClick={this._handle}>
                            {this._generateGrid(this.state.xSize, this.state.ySize, 'div', {className: `gridBlock willReduce`,symbols: {...this.state.symbols}} )}
                    </Grid>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
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
                            {this.props.children /*Remover*/}
                        </ButtonGroup>
                    </div>
                    
                </div>
            </div>
        );
    }
}



const WinnerWinnerChickenDinner = props => (
    props.finished === -1 ?(
        null
    ):(
        <div className="primary lt tttWho">
            <p>
                {(props.finished === -2)?('Empate!'):(`${props.players[props.finished].name} ganhou!`)}
            </p>
            <ButtonGroup>
                {props.local?(
                    <Button size="lg" variant="outline-primary" onClick={props._restart}>
                        Reiniciar
                    </Button>    
                ):(
                    null
                )}
                <Button size="lg" variant="outline-primary" href={paths.main}>
                    Voltar
                </Button>
            </ButtonGroup>
        </div>
    )
);

const TopState = props => (
    <p style={{textAlign: 'center'}} className={"lt primary" + (props.finished === -1 ? '' : ' disappear')}>
        {(props.finished === -1)?(
            `Vez de ${props.players[props.playing].name}!`
        ):(
            (props.finished === -2)?(
                'Empate!'
            ):(
                `${props.players[props.finished].name} ganhou!`
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