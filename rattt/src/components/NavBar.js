import React, { Component } from 'react'
import styled from 'styled-components'
import {
    Navbar,
    NavbarBrand,
    NavbarToggler
} from 'reactstrap'
import paths from 'config/paths'

export default class NavBox extends Component{

    constructor(){
        super();

        this.state = {
            toggle: false
        }
    }

    _toggleNav = () => {
        this.setState({toggle: !this.this.state.toggle})
    }

    render(){

        return(
            <div style={{zIndex: 5}}>
                <Navbar color="dark" expand="md" >
                    <NavbarBrand href={paths.main}><span class="logo blue">Ratt.io</span></NavbarBrand>
                    <NavbarToggler onClick={this._toggleNav}/>
                </Navbar>
            </div>
        )
    }
}