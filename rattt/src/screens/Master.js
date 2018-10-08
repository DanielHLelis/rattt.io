import React, { Component } from 'react'
import NavBox from 'components/NavBar'
import {
    
} from 'react-bootstrap'
import cheet from 'cheet.js'
import 'styles/master.css'

import $ from 'jquery'

export default class Master extends Component{

    render(){
        cheet('4 0 4', () => {
            window.open('/404', '_self');
        });
        cheet('p i n k', () => {
            $('#mark').html('Pink Mode');
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
        return(
            <div className="master">
                <NavBox/>
                
                {this.props.children}
            </div>
        );
    }
}