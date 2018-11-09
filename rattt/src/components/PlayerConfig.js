import React, { Component } from 'react'
import styled from 'styled-components'
import{
} from 'react-bootstrap'

import posed from 'react-pose'

export default class PlayerConfig extends Component{

    constructor(props){
        super(props);

        this.state = {
            nome: props.player.name || ''
        }
    }

    handleInput = (who, e) => {
        this.setState({[who]: e.target.value});
        
        let player = this.props.player;
        player.name = e.target.value;
        this.props.handleChange(player);
    }

    render(){
        return(
            <Input label="Nome" placeholder="Nome" type="text" value={this.state.nome} onChange={this.handleInput.bind(this, 'nome')} />
        )
    }
}

export class Input extends Component{
    constructor(props){
        super(props);

        this.state = {
            isFocused: false
        }
    }

    blur = (e) => {
        this.setState({isFocused: false});
        if(this.props.onBlur)
            this.props.onBlur(e);
    }

    focus = (e) => {
        this.setState({isFocused: true});
        if(this.props.onFocus)
            this.props.onFocus(e);
    }

    _handleLabel = (state) => {
        let {isFocused} = state, content = this.props.value;
        return{
            opacity: (isFocused || content.length > 0) ? 1 : 0,
            transform: `${(!isFocused && content.length > 0) ? 'translateY(40%)' : ''}${isFocused ? ' scale(1.2)' : ''}`,
        }
    }

    render(){
        let {label, inputClassName, labelClassName, labelId, labelStyle, inputStyle} = this.props;

        return(
            <div>
                <label>
                    <LabelText
                        {...this.props}
                        id={labelId}
                        className={labelClassName}
                        style={this._handleLabel(this.state)}>{label}</LabelText>
                    <TextInput
                        {...this.props}
                        style={inputStyle}
                        className={inputClassName}
                        onFocus={this.focus} onBlur={this.blur}
                    />
                </label>
            </div>
        )
    }
}

const LabelText = styled.span`
    color: var(--primary);
    display: block;
    font-size: 0.6em;
    transition: all 0.3s;
    transform-origin: 0 50%;
`;

const TextInput = styled.input`
    background-color: transparent;
    border: 0;
    border-color: var(--primary);
    border-bottom-width: 1px;
    border-bottom-style: solid;
    color: var(--light);
`;