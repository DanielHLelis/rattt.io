import React, { Component } from 'react'
import {
    Modal,
    Button
} from 'react-bootstrap'
import { Scrollbars } from 'react-custom-scrollbars'

import {
    NotificationContainer,
    // NotificationManager
} from 'react-notifications'

import NavBox from 'components/NavBar'
import SideBar from 'components/SideBar'

import $ from 'jquery'
import cheet from 'cheet.js'

export default class Master extends Component{

    constructor(){
        super();

        this.state = {
            modalVisible: false,
            modalTitle: '',
            modalContent: '',
            modalError: '',
            sideBar: false,
            scrollY: 0
        }
    }

    componentDidMount(){
        if(!window.localStorage.getItem('salt') || window.localStorage.getItem('salt').length === 0){
            window.localStorage.setItem('salt', new Date().getTime().toString(36) + 'xxxxxxxxxx'.replace(/x/g, () => Math.floor(Math.random()*36).toString(36)));
        }
    }

    handleScroll = (e) => {
        this.setState({scrollY: e.target.scrollTop})
    }

    handleError = (msg) => {
        this.setState({modalError: msg});
    }
    handleClose = () => {
        this.handleError('');
        this.setState({modalVisible: false});
    }
    handleOpen = () => {
        this.setState({modalVisible: true});
    }
    toggleSidebar = (pos) => {
        if(typeof(pos) !== 'boolean') pos = !this.state.sideBar;
        this.setState({sideBar: pos});
    }

    ratttAlert = (modalTitle, modalContent, modalButtons) => {
        this.setState({modalVisible: true, modalTitle, modalContent, modalButtons});
    }

    render(){
        cheets();

        window.ratttAlert = this.ratttAlert;

        return(
            <Scrollbars onScroll={this.handleScroll} autoHide autoHideTimeout={1000} autoHideDuration={400} className="master" >
                <div className="master">
                    <NotificationContainer/>
                    <RatttAlert {...this.state} handleError={this.handleError} handleClose={this.handleClose} />
                    <SideBar visible={this.state.sideBar} scrollY={this.state.scrollY} toggleSidebar={this.toggleSidebar} />
                    <NavBox sidebar={this.state.sideBar} brandOnClick={this.toggleSidebar} />

                    {this.props.children}
                </div>
            </Scrollbars>
        );
    }
}

const RatttAlert = (props) => {
    let ModalButtons = props.modalButtons;

    return(
        <Modal show={props.modalVisible} onHide={props.handleClose} dialogClassName="darkDialog">
            <Modal.Header>
                <Modal.Title className="white mt"><span className="white mt">{props.modalTitle}</span></Modal.Title>
            </Modal.Header>
            <Modal.Body className="white st">{props.modalContent}<div className="ssst" style={{textAlign: 'right', color: 'red'}}>{props.modalError}</div></Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={props.handleClose}>Fechar</Button>
                {
                    ModalButtons
                    ? <ModalButtons handleError={props.handleError} handleClose={props.handleClose}/>
                    :null
                }
            </Modal.Footer>
        </Modal>    
    )
};

const cheets = () => {
    cheet('4 0 4', () => {
        window.open('/404', '_self');
    });
    cheet('p i n k', () => {
        // $('#mark').html('Pink Mode');
        $('body').css('--primary', 'var(--pink)');
        setInterval(() => {
            let $el = $('.btn-outline-primary');
            $el.each(function(){
                let act = $(this);
                act.removeClass('btn-outline-primary');
                act.addClass('btn-outline-primaryPink');
            })
            
            $el = $('.btn-primary');
            $el.each(function(){
                let act = $(this);
                act.removeClass('btn-primary');
                act.addClass('btn-primaryPink');
            });
        }, 10);
    });
    cheet('u n i c o r n', () => {
        $('body').addClass('rainbow');
    })
}