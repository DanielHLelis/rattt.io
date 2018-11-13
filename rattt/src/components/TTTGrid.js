import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
    ButtonGroup,
    Button
} from 'react-bootstrap'
import styled from 'styled-components'
import PubSub from 'pubsub-js'
import $ from 'jquery'

import paths from 'config/paths'
import symbols from 'config/symbols'

import TTT from 'utils/TicTacToe'
/*
    TODO:
        -Alpha-beta pruning
*/
export default class TTTGrid extends Component{
    constructor(props){
        super(props);

        this.state = {
            xSize: props.xSize || 3,
            ySize: props.ySize || 3,
            seq: props.seq || 3,
            players: props.players,
            gravity: props.gravity || false,
            hovering: {
                raw: null,
                applied: null
            },
            disabled: props.disabled || [],
            playing: 0,
            used: 0,
            restart: false,
            innerWidth: window.innerWidth
        };
}

    componentWillMount(){
        this._setup();
    }

    componentDidMount(){
        window.addEventListener('resize', () => this.setState({innerWidth: window.innerWidth}));

        this.setState({oldState: this.state});
        PubSub.subscribe('reinicia', () => {
            if(this.props.local)
                this._restart();
            else
                console.error('Error! Only Local Games!');
        });
    }

    render(){
        return(
            <div className={"wrapper mbAuto"}>
                {this.props.children}
                <div className={"wrapper" + (this.state.restart ? ' disappear' : '') }>
                    <TopState {...this.state} />
                    <WinnerWinnerChickenDinner local={this.props.local} _restart={this._restart} {...this.state} />
                    <this.Grid/>
                </div>
                <div className="toolbar">
                        <this.Toolbar vertical={this.state.innerWidth < 475} leftButtons={this.props.leftButtons} rightButtons={this.props.rightButtons} />
                </div>
            </div>
        );
    }

    /* Setup */    
    defineContent = (i, val) => {
            let res = [];
            while(i--)res.push(val);
    
            this.state.disabled.forEach(el => res[el] = 'disabled')
    
            return res;
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
    _setup = () => {

        this._resetMatrix(() => {
            this.TTT = new TTT({
                seq: this.state.seq,
                players: this.state.players,
                width: this.state.xSize,
                height: this.state.ySize,
                matrix: this.state.matrix.content,
                gravity: this.state.gravity
            });    
        });
        this._resetGameState();
        
        this._botPlay();
    }

    /* Grid */

    _getSymbol = (_id, disabled = false) => {
        if(typeof _id !== 'string' && typeof _id !== 'number') return;

        let symbol;
        
        this.state.players.forEach(el => {
            if(el._id === _id)
                symbol = el.symbol;
        });
        return <span className={`${disabled ? 'blockContent-hover' : 'blockContent'}`} >{symbols[symbol]}</span>;
    }

    _houseChild = (pos, hovering = false) => {
        if(!hovering || (this.state.matrix.content[pos] !== null  && this.state.matrix.content[pos] !== undefined && this.state.matrix.content[pos] !== false))
            return this._getSymbol(this.state.matrix.content[pos]);
        
        return this._getSymbol(this.state.players[this.state.playing]._id, true)
    }

    _generateGrid = (w, h, El, props) => {
        let matrix = [];
        for(let i = 0; i < h; ++i){
            for(let j = 0; j < w; j++){
                let linearPos = i*w + j;
                let className = `${i === 0 ? 'block-top ' : ''}${i === h-1 ? 'block-bottom ' : ''}${j === 0 ? 'block-left ' : ''}${j === w-1 ? 'block-right ' : ''}`;

                if(this.state.matrix.content[linearPos] !== 'disabled'){
                    matrix[linearPos] = 
                        <El 
                            key={`${linearPos}`} 
                            data-pos={linearPos} {...props} 
                            className={`${props.className} ${className}`} 
                            onMouseEnter={() => this.setState({hovering: {raw: linearPos, applied: this.TTT.apply(linearPos)}})}
                            onMouseLeave={() => this.setState({hovering: {raw: null, applied: null}})}
                        >
                            {this._houseChild(linearPos,  this.state.hovering.applied === linearPos && !this.state.gameState.finished)}
                        </El>;
                }else{
                    matrix[linearPos] =
                        <El 
                            key={`${linearPos}`} 
                            data-pos={linearPos} {...props} 
                            className={`${props.className} ${className} disabled`} 
                        >
                        </El>;
                }
            }
        }
            
        return(matrix);
    }

    Grid = () => {
        return(
            <Grid className={this.gridClass()} x={this.state.xSize} y={this.state.ySize} onClick={this._handle}>
                {this._generateGrid(this.state.xSize, this.state.ySize, 'div', {className: `gridBlock`,symbols: {...this.state.symbols}})}
        </Grid>
        )  
    }

    Toolbar = (props) => {
        return (
            props.vertical
            ?(
                <ButtonGroup vertical className="toolbar" size="sm">    
                    {props.vertical ? null : props.leftButtons}    
                    {this.props.local?(
                        <Button variant="outline-primary" onClick={this._restart}>
                            <span className="st" >Reiniciar</span>
                        </Button>    
                    ):(
                        <Button variant="outline-primary" onClick={this._surrender}>
                            Desistir
                        </Button>
                    )}
                    {!props.vertical ? null : props.leftButtons} 
                    {props.rightButtons}
                </ButtonGroup>
            ):(
                <div className="flexR" >
                    <ButtonGroup className="toolbar flexBreak" size="sm" >
                        {this.props.local?(
                            <Button variant="outline-primary" onClick={this._restart}>
                                <span className="st" >Reiniciar</span>
                            </Button>    
                        ):(
                            <Button variant="outline-primary" onClick={this._surrender}>
                                Desistir
                            </Button>
                        )}
                    </ButtonGroup>
                    {props.leftButtons && props.leftButtons.length > 0
                       ?<ButtonGroup className="toolbar" size="sm" >
                            {props.leftButtons} 
                        </ButtonGroup>
                       : null
                    }
                    {props.rightButtons && props.rightButtons.length > 0
                       ?<ButtonGroup className="toolbar" size="sm" >
                            {props.rightButtons} 
                        </ButtonGroup>
                       : null
                    }
                </div>
            )
        )
    }

    gridClass = (extra = '') => (`tttGrid ${this.state.gameState.finished ? 'reduce' : ''} ${extra}`)
    

    /* Mechanics */
    _handle = (e) => {
        e.preventDefault();
        let $el = $(e.target);
        let pos = $el.data('pos'), newMatrix = this.state.matrix;
        if(this.state.players[this.state.playing].me)
            this._turn(pos, newMatrix, this._botPlay);
    }
    _turn = (i, matrix, cb = () => null) => {
        i = this.TTT.apply(i, matrix.content);

        if(!this.state.matrix.content[i] && (i !== null && i !== undefined) && !this.state.gameState.finished){
            matrix.content[i] = this.state.players[this.state.playing]._id; //Importante
            this.TTT.matrix = matrix.content;
            let gs = this.TTT.validate(matrix.content);
            this.setState({
                hovering: {raw: this.state.hovering.raw, applied: this.TTT.apply(this.state.hovering.raw, matrix.content)},
                playing: (this.state.playing + 1) % this.state.players.length,
                matrix: matrix,
                gameState: gs
            }, ()=>cb(matrix));
            if(gs.finished){
                if(typeof this.props.onFinish === 'function')
                    this.props.onFinish(gs, matrix)
            }
            return true;
        }
        return false;
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
    _restart = (e) => { //RESTART
        this.setState({restart: true});
        setTimeout(() => this.setState({...this.state.oldState, players: this.props.players}, this._setup), 200);
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
    <p className={"lt primary ct" + (props.gameState.finished ? ' disappear' : '')}>
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
    --size: calc(var(--maxWidth) / ${props => (props.y<props.x ? props.x : props.y)});
    --dimension: calc(var(--maxWidth) / ${props => (props.y<props.x ? props.x : props.y)});
    margin: 0 auto;
    display: grid;
    overflow: hidden;
    font-weight: lighter;
    grid-template: repeat(${props => props.y}, var(--dimension)) / repeat(${props => props.x}, var(--dimension));
    & * * *{
        font-size: var(--size) ;
    }
    & * * *.emojiIcon{
        font-size: calc(var(--size) * 0.8);
    }
    & * * * *{
        font-size: calc(var(--size) * 0.65);
        height: calc(var(--size) * 0.90);
        width: calc(var(--size) * 0.90);
    }
`;