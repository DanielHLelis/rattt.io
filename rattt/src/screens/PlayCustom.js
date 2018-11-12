import React, { Component } from 'react'
import styled from 'styled-components'

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

    getList = props => {
        if(!this.state.data) return(
            <div className="lt blue"> Não há modos salvos! </div>
        )
    }

    componentWillMount(){
        this.fetchData()
            .then((data) => this.setState({data: data}))
    }

    render(){
        return(
            <main className="darkBg contentDiv">
                <this.getList />
            </main>
        )
    }

}