import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components'
import $ from 'jquery'

import validate from 'utils/validatorTTT'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

// const icons = {
//     pizza: require('assets/images/pizza.svg')
// }

export default class TTTGrid extends Component{
    constructor(props){
        super(props);

        this.state = {
            xSize: props.xSize,
            ySize: props.ySize,
            players: props.players,
            playing: 1,
            used: 0,
            symbols: props.symbols,
            matrix: {},
            finished: -1
        }

    }  

    _generateGrid = (x, y, El, props) => {
        let matrix = [];
        for(let i = 0; i < y; ++i){
            matrix[i] = [];
            for(let j = 0; j < x; ++j){
                matrix[i][j] = <El key={`${i}/${j}`} data-posy={j} data-posx={i}{...props}><Content>{props.symbols[this.state.matrix[`${i}/${j}`]]}</Content></El>;
            }
        }
        return(matrix);
    }

    _handle = (e) => {
        e.preventDefault();
        let $el = $(e.target);
        let x = $el.data('posx'), y = $el.data('posy'), newMatrix = this.state.matrix;
        if(!this.state.matrix[`${x}/${y}`] && (x !== null && x !== undefined) && (y !== null && y !== undefined)){
            newMatrix[`${x}/${y}`] = this.state.playing;
            this.setState({
                playing: (this.state.playing % this.state.players) + 1,
                matrix: newMatrix,
                used: this.state.used + 1
            });
            
        }

        console.log(this.state);

    }

    render(){
        return(
            <div>
                {(this.state.finished)?(
                    <div></div>
                ):(
                    null
                )}
                <p style={{textAlign: 'center'}} className="mt blue">Vez do jogador {this.state.playing}!</p>
                <Grid x={this.state.xSize} y={this.state.ySize} onClick={this._handle}>
                    {this._generateGrid(this.state.xSize, this.state.ySize, DarkBlock, {symbols: {...this.state.symbols}} )}
                </Grid>
            </div>
                
        );
    }
}

const DarkBlock = styled.div`
    margin: 2px 2px 0 0;
    border: 1px solid var(--primary);
    border-radius: 4%;
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
`;

const appear = keyframes`
    0% { opacity: 0 }
    100% {opacity: 1}
`;

const disappear = keyframes`
    0% { opacity: 1 }
    100% {opacity: 0; display: none;}
`

const reduce = keyframes`
    0% { opacity: 1 }
    100% {
        opacity: 0.4;
        filter: blur(2)
    }
`;

const Content = styled.span`
    animation: ${appear} 0.15s ease-in;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    align-content: center;
    user-select: none;
`;

const Grid = styled.div`
    @media only screen and (max-width: 714px) {
        --size: ${props => 98/props.y}vw;
        margin-bottom: auto;
    }
    --size: ${props => 70/props.y}vh;
    display: grid;
    overflow: hidden;
    max-height: 98vw;
    max-width: 98vw;
    height: 70vh;
    width: 70vh;
    font-size: var(--size);
    font-weight: lighter;
    grid-template: repeat(${props => props.y}, ${props => 100/props.y}%) / repeat(${props => props.x}, ${props => 100/props.y}%);
    & * * *{
        font-size: calc(var(--size) * 0.65);
        height: calc(var(--size) * 0.90);
        width: calc(var(--size) * 0.90);
    }
`;