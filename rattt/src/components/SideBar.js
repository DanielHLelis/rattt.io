import React, { Component } from 'react'
import {
    Nav,
    Collapse
} from 'react-bootstrap'
import styled from 'styled-components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCaretDown
} from '@fortawesome/free-solid-svg-icons'

import paths from 'config/paths'

export default class SideBar extends Component{

    constructor(){
        super();

        this.state = {
            tttCollapse: false
        }
    }

    toggleTTT = () => {
        this.setState({tttCollapse: !this.state.tttCollapse});
    }

    render(){
        return(
            <div className={'sidebar' + (this.props.visible ? '' : ' hide')} visible={this.state.visible} >
                <Nav className='flex-column'>
                
                    <NavItem onClick={(e) => window.localStorage.setItem('firstEnter', 'true')} href={paths.index}>
                        Intro
                    </NavItem>
                    <NavItem href={paths.main}>
                        Home
                    </NavItem>

                    <Nav.Item>
                        <NavLink onClick={this.toggleTTT}><Caret {...this.state}/> TicTacToe</NavLink>
                        <Collapse in={this.state.tttCollapse} className="sideCollapse">
                            <NavLink href={paths.tradicional}>Tradicional</NavLink>
                        </Collapse>
                    </Nav.Item>
                    
                </Nav>
            </div>
        );
    }

}


const NavLink = (props) => (
    <Nav.Link {...props} className={props.className + ' sidebar-item'} >
        {props.children}
    </Nav.Link>
);

const NavItem = (props) => (
    <Nav.Item>
        <Nav.Link {...props} className={props.className + " sidebar-item"}>{props.children}</Nav.Link>
    </Nav.Item>
);

const Caret = (props) => (
    <FontAwesomeIcon className='caret' style={(props.tttCollapse)?({transform: 'rotate(180deg)'}):null} icon={faCaretDown}/>
);

const SideBarContainer = styled.div`
    --sideWidth: 20vw;
    position: fixed;
    background-color: #3b3b3b;
    height: 100vh;
    width: var(--sideWidth);
    left: ${props => props.visible ? 0 : -20}vw;
    z-index: 2;
    transition: left 0.6s ease-in-out;
`;