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

    _ratttAlert = () => window.ratttAlert('Ops!','Aparentemente nossos ratos comeram o fio do servidor! Estamos tentando providenciar uma solução para o problema!')

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
                        <Nav className="ml-auto"> 

                            <Nav.Link onClick={this._ratttAlert} className="mt" href={''}>
                                <Button onClick={this._ratttAlert} size="md" variant="outline-primary" >Log-in</Button>
                            </Nav.Link>

                            <Nav.Link onClick={this._ratttAlert} className="mt" href={''}>
                                <Button onClick={this._ratttAlert} size="md" variant="outline-primary" >Sign-up</Button>
                            </Nav.Link>

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