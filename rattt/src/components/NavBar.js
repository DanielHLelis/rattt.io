import React, { Component } from 'react'
import {
    Navbar,
    Nav,
    Button
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

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

    _ratttAlert = () => window.ratttAlert('Ops!','Aparentemente nossos ratos comeram o fio do servido! Tente novamente mais tarde!')

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

                            <NavLink onClick={this._ratttAlert} className="mt" href={''}>
                                <Button size="md" variant="outline-primary" >Log-in</Button>
                            </NavLink>

                            <NavLink onClick={this._ratttAlert} className="mt" href={''}>
                                <Button size="md" variant="outline-primary" >Sign-up</Button>
                            </NavLink>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        )
    }
}
const NavLink = (props) => (
    <Link to={props.href}>
        <Nav.Link {...props} className={props.className} >
            {props.children}
        </Nav.Link>
    </Link>
    
);

const NavItem = (props) => (
    <Link to={props.href}>
        <Nav.Item>
            <Nav.Link {...props} className={props.className}>{props.children}</Nav.Link>
        </Nav.Item>
    </Link>
    
);
const Caret = (props) => (
    <FontAwesomeIcon className='caret' style={(props.active)?({transform: 'rotate(90deg)'}):({transform: 'rotate(-90deg)'})} icon={faCaretDown}/>
);