import React, { Component } from 'react'
import styled from 'styled-components'
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Collapse,
    Button,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import paths, {NavData} from 'config/paths'

const test = [
    {href: '/', label: 'Intro', func: (e) => {
        window.localStorage.setItem('firstEnter', 'true');
    }}
]

export default class NavBox extends Component{

    constructor(){
        super();

        this.state = {
            isOpen: false
        }
    }

    _setEnter = (e) => {
        window.localStorage.setItem('firstEnter', 'true');
    }

    _toggleNav = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    render(){
        return(
            <header className='header'>
                <Navbar color="dark" expand="md">
                    <NavbarBrand href={paths.main}><span id="mark" class="logo st blue">Ratt.io</span></NavbarBrand>
                    <NavbarToggler className={(this.state.isOpen)?('rotate rotate-active'):('rotate')} onClick={this._toggleNav}>
                        <Button color="primary">{' ▼ '}</Button>
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {NavData.map((item, index) => 
                                <NavItem key={toString(index)}>
                                    <NavLink onClick={item.onClick} className="sst" href={item.href}>
                                        <Button color="primary" outline >{item.label}</Button>
                                    </NavLink>
                                </NavItem>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        )
    }
}