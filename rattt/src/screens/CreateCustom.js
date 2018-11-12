import React, { Component } from 'react'
import styled from 'styled-components'

import { NotificationManager } from 'react-notifications'

import {
    Button
} from 'react-bootstrap'

import {
    Input,
    Switch
} from 'components/core/Inputs'

const sequenceRule = {
    min: 2,
    max: 15
}
const playersRule = {
    min: 2,
    max: 8
}

export default class CreateCustom extends Component{
    constructor(props){
        super(props);

        this.default = {
            w: 15,
            h: 15,
            matrix: [],
            name: '',
            sequence: '',
            players: '',
            gravity: false
        }

        this.state = {
            ...this.default
        }
    }

    generateGrid = (w, h, El, props) => {
        let matrix = [];
        for(let i = 0; i < h; ++i){
            for(let j = 0; j < w; j++){
                let linearPos = i*w + j, className = `${i === 0 ? 'block-top ' : ''}${i === h-1 ? 'block-bottom ' : ''}${j === 0 ? 'block-left ' : ''}${j === w-1 ? 'block-right ' : ''}`;
                matrix[linearPos] = 
                    <El 
                        key={`${linearPos}`} 
                        data-pos={linearPos} 
                        {...props} 
                        className={`${props.className} ${className} ${!this.state.matrix[linearPos] || !this.state.matrix[linearPos] ? 'disabled' : ''}`} 
                        onMouseEnter={(e) => {if(typeof props.onMouseEnter === "function") props.onMouseEnter(e); this._handleChange(e, linearPos)}}
                        onMouseDown={(e) => {if(typeof props.onMouseDown === "function") props.onMouseDown(e); this._handleChange(e, linearPos)}} 
                    />
            }
        }
        return matrix;
    }

    _onMouseDown = (e) => {
        this.setState({mouseDown: true});
    }
    _onMouseUp = (e) => {
        this.setState({mouseDown: false});
    }
    _handleChange = (e, index) => {
        if(e.nativeEvent.which === 1 || e.nativeEvent.which === 3){
            let {matrix} = this.state;
            matrix[index] = !matrix[index];
            this.setState({matrix});
        }       
    }
    handleInput = (who, e) => {
        this.setState({[who]: e.target.value});
    }
    handleIntInput = (who, min, max, e) => {
        let val = parseInt(e.target.value, 10);

        if(val > max) val = 15;
        if(val < min) val = 2;

        this.setState({[who]: val})
    }
    handleGravity = (checked, e, id) => {
        this.setState({gravity: checked});
    }

    reset = () => this.setState({...this.default});

    save = () => {
        this.setState({error: ''});
        
        let extract = this.export();
        if(!extract) return this.setState({error: 'Seleção muito pequena!'})
        if(extract.name.length < 1) return this.setState({error: "Insira um nome!"});
        if(extract.sequence < 2) return this.setState({error: 'Sequência muito pequena!'});
        if(extract.width*extract.height <= extract.sequence * 2) return({error: 'Muito pequeno para uma sequência de ' + this.state.sequence + '!'});
        if(extract.width < 3 && extract.height < 3) return this.setState({error: 'Muito pequeno!'});

        let store = JSON.parse(window.localStorage.getItem('customLayouts'));

        if(!store) store = [];

        store.unshift(extract);

        window.localStorage.setItem('customLayouts', JSON.stringify(store));
        NotificationManager.info(`"${extract.name}" salvo!`, 'Salvo!');
        this.setState({...this.default, matrix: []});
    
    }
    
    render(){
        
        return(
            <main className="darkBg contentDiv" >
                <h1 className="mt primary" >Criar Mapa</h1>
                <Grid x={this.state.w} y={this.state.h} className="tttGrid" onMouseDown={this._onMouseDown} onMouseUp={this._onMouseUp} >
                    {this.generateGrid(this.state.w, this.state.h, 'div', {
                        className: 'gridBlock'
                    })}
                </Grid>
                
                <Toolbar>
                    <Row>
                        <Input 
                            label="Nome"
                            labelStyle={{fontSize: '0.8em'}}
                            placeholder="Novo Modo" 
                            type="text" 
                            value={this.state.name} 
                            onChange={this.handleInput.bind(this, 'name')} 
                        />
                        <Input 
                            label="Sequência"
                            labelStyle={{fontSize: '0.8em'}}
                            inputStyle={{width: '150%'}}
                            placeholder={3} 
                            type="number"
                            step="1"
                            min="2"
                            max="15"
                            value={this.state.sequence} 
                            onChange={this.handleIntInput.bind(this, 'sequence',  1, sequenceRule.max)} 
                        />
                            <Switch 
                                label="Gravidade"
                                labelStyle={{fontSize: '0.8em'}}
                                offColor="#dc3545"
                                onColor="#28a745"
                                checked={this.state.gravity}
                                onChange={this.handleGravity}
                                checkedIcon={false}
                                uncheckedIcon={false}
                                handleDiameter={26}
                                height={30}
                            />
                        <Input 
                            label="Jogadores"
                            labelStyle={{fontSize: '0.8em'}}
                            inputStyle={{width: '150%'}}
                            placeholder={2} 
                            type="number"
                            step="1"
                            min="2"
                            max="8"
                            value={this.state.players} 
                            onChange={this.handleIntInput.bind(this, 'players', playersRule.min, playersRule.max)} 
                        />
                        <Button className="mvAuto" variant="outline-primary" onMouseDown={this.save}>Salvar</Button>
                    </Row>
                    <Error className="sst red" >{this.state.error}</Error>
                </Toolbar>
            </main>
        )
    }
    
    export = () => {
        let {matrix, w} = this.state, pos = [];

        matrix.forEach((el, index) => {

            if(el)
                pos.push({
                    y: Math.floor(index/w),
                    x: index%w
                });
        });

        if(pos.length === 0) return;

        let minX = pos.reduce((acc, val) => acc.x < val.x ? acc : val).x, 
            maxX = pos.reduce((acc, val) => acc.x > val.x ? acc : val).x,
            minY = pos.reduce((acc, val) => acc.y < val.y ? acc : val).y,
            maxY = pos.reduce((acc, val) => acc.y > val.y ? acc : val).y,
            width = maxX - minX + 1, height = maxY - minY + 1;

        let valid = pos.map((el) => (el.y - minY)*width + (el.x - minX));

        let invalid = [];

        for(let i = 0; i < width*height; i++){
            if(!valid.includes(i))invalid.push(i);
        }

        return {
            width,
            height,
            _id: new Date().getTime().toString(36) + 'xxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random()*36).toString(36)),
            disabled: invalid,
            name: this.state.name || 'Novo Modo',
            sequence: this.state.sequence || 3,
            gravity: this.state.gravity,
            players: this.state.players || 2
        }
    }
}

const Toolbar = styled.div`
    max-width: 85vw;
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin: 10px 0 0 0;
    display: flex;
    flex-direction: column;
    
`;
const Row = styled.div`
    display: flex;
    flex-direction: row;
    & > *{
        margin: 0 30px;
    }
`;
const Grid = styled.div`
    --size: calc(var(--maxWidth) / ${props => (props.y<props.x ? props.x : props.y)});
    --dimension: calc(var(--maxWidth) / ${props => (props.y<props.x ? props.x : props.y)});
    margin: 0 auto;
    display: grid;
    overflow: hidden;
    font-weight: lighter;
    grid-template: repeat(${props => props.y}, var(--dimension)) / repeat(${props => props.x}, var(--dimension));
`;

const Error = styled.div`
    color: var(--red);
    text-align: center;
`;