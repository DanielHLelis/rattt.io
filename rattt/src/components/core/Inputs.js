import React, { Component } from 'react'
import styled from 'styled-components'
import{
    DropdownButton,
    Dropdown
} from 'react-bootstrap'

import posed from 'react-pose'


export class Select extends Component{

    constructor(props){
        super(props);

        this.state = {

        };
    }

    handleClick = (e, value) => {
        e.target.blur()
        if(this.props.onChange)
            this.props.onChange(e, value);
    }

    _handleLabel = (state) => {
        let {isFocused} = state;
        return{
            transform: `${(!isFocused) ? 'translateY(40%)' : ''}${isFocused ? ' scale(1.2)' : ''}`,
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

    render(){
        let {options, value, label, placeholder, labelClassName, labelId, labelStyle} = this.props;

        return(
            <div>
                <label>
                    <LabelText
                        {...this.props}
                        id={labelId}
                        className={labelClassName}
                        style={this._handleLabel(this.state)}
                    >
                        {label}
                    </LabelText>

                    <DropdownButton
                        {...this.props}
                        id={`${label}Dropdown`}
                        onBlur={this.blur} onFocus={this.focus} 
                        size="md" 
                        title={value ? value.label : placeholder} 
                        variant="outline-primary"
                    >
                        {options.map((el, index) => {
                            return(
                                <Dropdown.Item key={index.toString()} onClick={(e) => this.handleClick(e, el)} >
                                    {el.label}
                                </Dropdown.Item>
                            )
                        })}
                    </DropdownButton>
                </label>
            </div>
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
    margin: 0.4em 0 0.5em 0;
`;

const TextInput = styled.input`
    margin: 0;
    background-color: transparent;
    border: 0;
    border-color: var(--primary);
    border-bottom-width: 1px;
    border-bottom-style: solid;
    color: var(--light);
    &:disabled{
        opacity: 0.6;
        cursor: not-allowed;
    }
`;