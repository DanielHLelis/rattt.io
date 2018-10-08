import React, { Component } from 'react'
import {
    Navbar,
    Nav,
    Button
} from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{
    faCaretDown
} from '@fortawesome/free-solid-svg-icons'

import paths, {RightNavData} from 'config/paths'

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
                    <Navbar.Brand><span id="mark" onClick={this.props.brandOnClick} className="logo st primary">Rattt.io <Caret active={this.props.sidebar} /></span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" variant="outline-primary" />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">{/*ml == margin left; mr == margin right*/}
                        </Nav>
                        <Nav className="ml-auto">{/*ml == margin left; mr == margin right*/}
                            {RightNavData.map((item, index) => 
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

const Caret = (props) => (
    <FontAwesomeIcon className='caret' style={(props.active)?({transform: 'rotate(90deg)'}):({transform: 'rotate(-90deg)'})} icon={faCaretDown}/>
);