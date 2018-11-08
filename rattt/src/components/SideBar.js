import React, { Component } from 'react'
import {
    Nav,
    Collapse
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCaretDown
} from '@fortawesome/free-solid-svg-icons'

import paths from 'config/paths'

export default class SideBar extends Component{

    constructor(){
        super();

        this.state = {
            tttCollapse: false,
            scrollY: window.scrollY
        }
    }

    toggleTTT = () => {
        this.setState({tttCollapse: !this.state.tttCollapse});
    }
    NavLink = (props) => (
        <Link {...props} onClick={(e) => {
            if(props.onClick) props.onClick(e);
            this.props.toggleSidebar(false);
        }} className={props.className + ' sidebar-item nav-link'} to={props.href}>
                {props.children}
        </Link>
        
    );
    NavItem = (props) => (
        <Nav.Item>
            <this.NavLink {...props} className={props.className}>{props.children}</this.NavLink>
        </Nav.Item>
    
    );

    _translate = () => this.state.scrollY > this.state.maxTrans ? this.state.maxTrans : this.state.scrollY

    render(){
        let {NavLink, NavItem} = this;

        window.onscroll = (e) => {
            this.setState({scrollY: window.scrollY,
                maxTrans: window.document.getElementById('side-container').offsetTop});
        }

        return(
            <div className={'sidebar' + (this.props.visible ? '' : ' hide')} visible={this.state.visible} >
                <Nav onScroll={e => console.log(e)} id='side-container' className='flex-column' style={{
                    transform: `translateY(-${this._translate()}px)`
                }}>
                
                    <NavItem onClick={(e) => window.localStorage.setItem('firstEnter', 'true')} href={paths.index}>
                        Intro
                    </NavItem>

                    <NavItem href={paths.main}>
                        Home
                    </NavItem>
                    

                    <Nav.Item>
                        <Nav.Link className="sidebar-item" onClick={this.toggleTTT}><Caret {...this.state}/> TicTacToe</Nav.Link>
                        <Collapse in={this.state.tttCollapse} className="sideCollapse">
                            <NavLink href={paths.tradicional}>Tradicional</NavLink>
                        </Collapse>
                    </Nav.Item>
                    
                </Nav>
            </div>
        );
    }

}

const Caret = (props) => (
    <FontAwesomeIcon className='caret' style={(props.tttCollapse)?({transform: 'rotate(180deg)'}):null} icon={faCaretDown}/>
);