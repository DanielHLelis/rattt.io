import React, { Component } from 'react'
import {
    Navbar,
    Nav,
    Button
} from 'react-bootstrap'

import paths, {NavData} from 'config/paths'

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
                <Navbar variant="dark" bg="dark" expand="lg">
                    <Navbar.Brand href={paths.main}><span id="mark" className="logo st blue">Ratt.io</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" color="primary" />
                    <Navbar.Collapse>
                        <Nav className="ml-auto">{/*ml == margin left; mr == margin right*/}
                            {NavData.map((item, index) => 
                                    <Nav.Link key={index.toString()} onClick={item.onClick} className="mt" href={item.href}>
                                        <Button size="md" variant="outline-primary" >{item.label}</Button>
                                    </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        )
    }
}