import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'

import GameHandler from 'components/GameHandler'
import generateLocal from 'utils/generateLocal'

import styled, { keyframes } from 'styled-components'

export default class CustomRenderer extends Component{
    constructor(props){
        super(props);

        this.state = {
            settings: [],
            loading: true
        };
    }

    fetchData = async (cb = () => null) => {
        let data = JSON.parse( await window.localStorage.getItem('customLayouts'));

        cb(data);

        return data;
    }

    handleData = (data = [], id, cb = () => null) => {
        this.setState({settings: data.filter(el => el._id === id)[0], loading: false});
    }

    componentWillMount(){
        this.fetchData((data) => this.handleData(data, this.props.id));
    }

    mainComponent = props => {
        let { settings } = this.state;
        if(!this.state.loading && settings){
            return(
                <GameHandler 
                    players={generateLocal(settings.players)} 
                    local={true} 
                    width={settings.width} 
                    height={settings.height} 
                    sequence={settings.sequence} 
                    gravity={settings.gravity} 
                    disabled={settings.disabled} 
                    possiblePlayers={['Local', 'Brandom']} 
                />
            )
        }
        return( <Redirect to='/404' />)
    };

    render(){
        return(
            <main className="darkBg contentDiv">
                {
                    this.state.loading
                    ? <Loader />
                    : <this.mainComponent />
                }
            </main>
        )
    }

}

const spin = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
    border-radius: 50%;
    width: ${props => props.size || '50px'};
    height: ${props => props.size || '50px'};
    animation: ${spin} ${props => props.duration || '2s'} linear infinite;
    border: ${props => props.width || '16px'} solid ${props => props.mainColor || 'var(--primary'};
    border-top-color: ${props => props.secondColor || '#888'};
`;