import React, { Component } from 'react'
import {
    Modal,
    Button
} from 'react-bootstrap'
import styled from 'styled-components'

import 'styles/master.css'

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
            sideBar: false
        }
    }

    handleClose = () => {
        this.setState({modalVisible: false});
    }
    handleOpen = () => {
        this.setState({modalVisible: true});
    }
    toggleSidebar = () => {
        this.setState({sideBar: !this.state.sideBar});
    }

    ratttAlert = (modalTitle, modalContent) => {
        this.setState({modalVisible: true, modalTitle, modalContent});
    }

    render(){
        cheets();

        window.ratttAlert = this.ratttAlert;

        return(
            <div className="master">
                <RatttAlert {...this.state} handleClose={this.handleClose} />
                <SideBar visible={this.state.sideBar} />
                <NavBox sidebar={this.state.sideBar} brandOnClick={this.toggleSidebar} />
                
                {this.props.children}
            </div>
        );
    }
}

const RatttAlert = (props) => (
    <Modal show={props.modalVisible} onHide={props.handleClose} dialogClassName="darkDialog">
        <Modal.Header>
            <Modal.Title className="white mt"><span className="white mt">{props.modalTitle}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body className="white st">{props.modalContent}</Modal.Body>
        <Modal.Footer>
            <Button variant="outline-danger" onClick={props.handleClose}>Fechar</Button>
        </Modal.Footer>
    </Modal>
);

const cheets = () => {
    cheet('4 0 4', () => {
        window.open('/404', '_self');
    });
    cheet('p i n k', () => {
        // $('#mark').html('Pink Mode');
        $('body').css('--primary', 'var(--pink)');
        let $el = $('.btn-outline-primary');
        console.log($el);
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
    });
    cheet('u n i c o r n', () => {
        $('body').addClass('rainbow');
    })
}