import React, { Component } from 'react'
import {
    Nav,
    Collapse
} from 'react-bootstrap'

import { NavLink as Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCaretDown
} from '@fortawesome/free-solid-svg-icons'

import paths from 'config/paths'

import { modeExtractor, campanhaExtractor } from 'config/gameRoutes'

const Modes = modeExtractor();
const Campanha = campanhaExtractor();

export default class SideBar extends Component{

    constructor(){
        super();

        this.state = {
            tttCollapse: {},
        }

        this.container = React.createRef();
    }
    toggleTTT = (index, val = !this.state.tttCollapse[index]) => {
        let tttCollapse = this.state.tttCollapse;
        tttCollapse[index] = val;
        this.setState({tttCollapse});
    }
    NavLink = (props) => (
        <Link {...props} onClick={(e) => {
            if(props.onClick) props.onClick(e);
            this.props.toggleSidebar(false);
        }} className={props.className + ' sidebar-item nav-link sst'} activeClassName='sidebar-item-active' exact={true} to={props.href}>
                {props.children}
        </Link>
        
    );
    NavItem = (props) => (
        <Nav.Item>
            <this.NavLink {...props} className={props.className || ''}>{props.children}</this.NavLink>
        </Nav.Item>
    
    );

    _translate = () => {
        if(this.container.current)
            return this.props.scrollY > this.container.current.offsetTop ? this.container.current.offsetTop : this.props.scrollY;
        else
            return 0;
    }

    MainOptions = (props) => 
        <div {...props}>
            {Modes.map((el, index) => (
                <this.NavLink key={index.toString()} onClick={() => this.toggleTTT(props.index, false)} href={el.href} className="sideCollapse" >{el.name}</this.NavLink>
            ))}
        </div>

    CampanhaOptions = (props) =>(
        <div {...props}>
            {Campanha.map((el, index) => (
                <this.NavLink key={index.toString()} onClick={() => this.toggleTTT(props.index, false)} href={el.href} className="sideCollapse" >{el.name}</this.NavLink>
            ))}
        </div>
    )


    render(){
        let {NavLink, NavItem} = this;

        // window.addEventListener('scroll', (e) => {
        //     if(window.document.getElementById('side-container'))
        //         console.log(window.document.getElementById('side-container').offsetTop)
        //         this.setState({scrollY: window.scrollY,
        //             maxTrans: window.document.getElementById('side-container').offsetTop});
        // });

        return(
            <div className={'sidebar' + (this.props.visible ? '' : ' hide')} visible={this.state.visible} >
                {/* <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={400}  style={{height: '100vh'}}> */}
                <div 
                    id='side-container' 
                    className="scrollSide" 
                    style={{
                        transform: `translateY(-${this._translate()}px)`
                    }} 
                    ref={this.container}
                >
                    <Nav onScroll={e => console.log(e)}  className='flex-column'>
                    
                        <NavItem onClick={(e) => window.localStorage.setItem('firstEnter', 'true')} href={paths.index}>
                            Intro
                        </NavItem>

                        <NavItem href={paths.main}>
                            Home
                        </NavItem>
                        

                        <Nav.Item>
                            <Nav.Link className="sidebar-item" onClick={() => this.toggleTTT('modes')}><Caret active={this.state.tttCollapse.modes} /> Modos</Nav.Link>
                            <Collapse in={this.state.tttCollapse.modes} className="sideCollapse">
                                <this.MainOptions index="modes" />
                            </Collapse>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link className="sidebar-item" onClick={() => this.toggleTTT('campanha')}><Caret active={this.state.tttCollapse.campanha} /> Campanha</Nav.Link>
                            <Collapse in={this.state.tttCollapse.campanha} className="sideCollapse">
                                <this.CampanhaOptions index="campanha" />
                            </Collapse>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link className="sidebar-item" onClick={() => this.toggleTTT('custom')}><Caret active={this.state.tttCollapse.custom} /> Custom</Nav.Link>
                            <Collapse in={this.state.tttCollapse.custom} className="sideCollapse">
                                <div>
                                    <NavLink 
                                        onClick={() => this.toggleTTT('custom', false)} 
                                        href={paths.playCustom} className="sideCollapse" 
                                    >
                                        Jogar
                                    </NavLink>
                                    <NavLink 
                                        onClick={() => this.toggleTTT('custom', false)} 
                                        href={paths.createCustom} className="sideCollapse" 
                                    >
                                        Criar
                                    </NavLink>
                                </div>
                            </Collapse>
                        </Nav.Item>

                        <NavItem href={paths.credits}>
                            Créditos
                        </NavItem>
                    </Nav>
                {/* </Scrollbars> */}
                </div>
            </div>
        );
    }

}

const Caret = (props) => (
    <FontAwesomeIcon className='caret' style={(props.active)?({transform: 'rotate(180deg)'}):null} icon={faCaretDown}/>
);