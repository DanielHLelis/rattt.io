import React, { Component } from 'react'
import styled, {keyframes} from 'styled-components'
import $ from 'jquery'

export default class TTTGrid extends Component{
    constructor(props){
        super(props);

        this.state = {
            xSize: 3,
            ySize: 3,
            players: 2,
            playing: 1,
            symbols: {
                '1': <Content>X</Content>,
                '2': <Content>O</Content>
            },
            matrix: {}
        }

    }  

    _generateGrid = (x, y, El, props) => {
        let matrix = [];
        for(let i = 0; i < y; ++i){
            matrix[i] = [];
            for(let j = 0; j < x; ++j){
                matrix[i][j] = <El data-posy={i} data-posx={j}{...props}>{props.symbols[this.state.matrix[`${j}/${i}`]]}</El>;
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
            this.setState({playing: (this.state.playing % this.state.players) + 1})
            this.setState({matrix: newMatrix});
        }

    }

    render(){
        return(
            <div>
                <p style={{textAlign: 'center'}} className="mt blue">Vez do jogagor {this.state.playing}!</p>
                <Grid x={this.state.xSize} y={this.state.ySize} onClick={this._handle}>
                    {this._generateGrid(this.state.xSize, this.state.ySize, DarkBlock, {symbols: {...this.state.symbols}} )}
                </Grid>
            </div>
                
        );
    }
}

const DarkBlock = styled.div`
    margin: 2px 2px 0 0;
    border: 1px solid #00a4dd;
    border-radius: 4%;
    color: #00a4dd;
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

const Content = styled.span`
    animation: ${appear} 0.1s ease-in;
    margin: 0;
    padding: 0;
    user-select: none;
`;

const Grid = styled.div`
    @media only screen and (max-width: 714px) {
        font-size: ${props => 98/props.y}vw;
        margin-bottom: auto;
    }
    display: grid;
    max-height: 98vw;
    max-width: 98vw;
    height: 70vh;
    width: 70vh;
    font-size: ${props => 70/props.y}vh;
    font-weight: lighter;
    grid-template: repeat(${props => props.y}, ${props => 100/props.y}%) / repeat(${props => props.x}, ${props => 100/props.y}%);
`;