import React, { Component } from 'react'
import styled from 'styled-components'
import $ from 'jquery'



import validate from 'utils/validatorTTT'
import toMatrix from 'utils/objToMatrix'

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
            seq: props.seq,
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
                matrix[i][j] = <El key={`${i}/${j}`} data-posy={j} data-posx={i}{...props}>{props.symbols[this.state.matrix[`${i}/${j}`]]}</El>;
            }
        }
        return(matrix);
    }

    _handle = (e) => {
        e.preventDefault();
        let $el = $(e.target);
        let x = $el.data('posx'), y = $el.data('posy'), newMatrix = this.state.matrix;
        if(!this.state.matrix[`${x}/${y}`] && (x !== null && x !== undefined) && (y !== null && y !== undefined) && this.state.finished === -1){
            newMatrix[`${x}/${y}`] = this.state.playing;
            console.log(toMatrix(newMatrix, this.state.xSize, this.state.ySize));
            this.setState({
                playing: (this.state.playing % this.state.players) + 1,
                matrix: newMatrix,
                used: this.state.used + 1,
                finished: validate(this.state.ySize, this.state.xSize, toMatrix(newMatrix, this.state.xSize, this.state.ySize), this.state.seq, this.state.used + 1, this.state.xSize * this.state.ySize)
            });
        }
    }

    componentWillMount(){
        this.setState({oldState: {...this.state}});
    }

    render(){
        return(
            <div style={{marginBottom: 'auto'}}>
                <TopState {...this.state} />
                <div className="wrapper">
                    <WinnerWinnerChickenDinner {...this.state} />
                    <Grid className={`tttGrid` + (this.state.finished === -1 ? '' : ' reduce')} finished={this.state.finished} x={this.state.xSize} y={this.state.ySize} onClick={this._handle}>
                            {this._generateGrid(this.state.xSize, this.state.ySize, 'div', {className: `gridBlock willReduce`,symbols: {...this.state.symbols}} )}
                    </Grid>
                </div>
                
            </div>
                
        );
    }
}



const WinnerWinnerChickenDinner = props => (
    props.finished===-1 ?(
        null
    ):(
        <p className="primary lt tttWho" >
            {
                (props.finished === 0)?(
                    'Empate!'
                ):(
                    `O jogador ${props.finished} ganhou!`
                )
            }
        </p>
    )
);

const TopState = props => (
    <p style={{textAlign: 'center'}} className={"lt primary" + (props.finished === -1 ? '' : ' disappear')}>
        {(props.finished === -1)?(
            `Vez do jogador ${props.playing}!`
        ):(
            (props.finished === 0)?(
                'Empate!'
            ):(
                `O jogador ${props.finished} ganhou!`
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