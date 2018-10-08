import React, { Component } from 'react'
import NavBox from 'components/NavBar'
import {
    Modal,
    Button
} from 'react-bootstrap'
import cheet from 'cheet.js'
import 'styles/master.css'

import $ from 'jquery'
import styled from 'styled-components'

export default class Master extends Component{

    constructor(){
        super();

        this.state = {
            isVisible: false,
            title: '',
            content: ''
        }
    }

    handleClose = () => {
        this.setState({isVisible: false});
    }
    handleOpen = () => {
        this.setState({isVisible: true});
    }

    ratttAlert = (title, content) => {
        this.setState({isVisible: true, title, content});
    }

    render(){
        cheets();
        window.ratttAlert = this.ratttAlert;
        return(
            <div className="master">
                <Modal show={this.state.isVisible} onHide={this.handleClose} dialogClassName="darkDialog">
                    <Modal.Header>
                        <Modal.Title className="white mt"><span className="white mt">{this.state.title}</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="white st">{this.state.content}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={this.handleClose}>Fechar</Button>
                    </Modal.Footer>
                </Modal>

                <NavBox/>
                
                {this.props.children}
            </div>
        );
    }
}

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