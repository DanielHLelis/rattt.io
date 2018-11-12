import React, { Component } from 'react'
import styled from 'styled-components'

import { NotificationManager } from 'react-notifications'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import {
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons'

import {
    NavLink as Link
} from 'react-router-dom'

import {
    Button,
    ButtonGroup
} from 'react-bootstrap'
import paths from 'config/paths';

export default class PlayCustom extends Component{

    constructor(props){
        super(props);

        this.state = {

        }
    }

    fetchData = async (cb = () => null) => {
        let data = JSON.parse( await window.localStorage.getItem('customLayouts'));

        cb(data);

        return data;
    }

    deleteItem = (id) => {
        this.fetchData()
            .then((data) => {
                let newData = data.filter(el => el._id !== id);
                window.localStorage.setItem('customLayouts', JSON.stringify(newData));
                this.setState({data: newData});
                NotificationManager.error('O modo foi deletado!', 'Deletado!');
            })
    }

    getList = props => {
        if(!this.state.data || this.state.data.length === 0) return(
            <div className="mt primary"> Não há modos salvos! </div>
        )

        console.log(this.state.data)

        return this.state.data.map((el, index) => (
            <ButtonGroup key={index.toString()} >
                <Button variant="outline-primary" ><Link className="primary" to={`${paths.gameCustom}/${el._id}`}>{el.name}</Link></Button>
                <Button variant="outline-primary" onClick={() => this.deleteItem(el._id)} ><Icon icon={faTrashAlt} /></Button>
            </ButtonGroup>
        ));
    }

    componentWillMount(){
        this.fetchData()
            .then((data) => this.setState({data: data}))
    }

    render(){
        return(
            <main className="darkBg contentDiv">
                <h1 className="lt primary ct" >Jogar customizado</h1>
                <ItemGrid length={this.state.data ? this.state.data.length : 3} >
                    <this.getList />
                </ItemGrid>
            </main>
        )
    }

}

const ItemGrid = styled.div`
    margin-top: 15px;
    margin-bottom: auto;
    display: grid;
    grid-template-columns: repeat(${props => props.length <= 3 ? props.length : 3}, 1fr);
    max-width: 80vw;
    grid-gap: 10px;
    @media screen and (max-width: 475px){
        grid-template-columns: repeat(1, 1fr);
    }
`;