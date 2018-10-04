import React, { Component } from 'react'
import NavBox from 'components/NavBar'
import {
    
} from 'react-bootstrap'
import cheet from 'cheet.js'
import 'styles/master.css'

export default class Master extends Component{

    render(){
        cheet('4 0 4', () => {
            window.open('/404', '_self');
        });
        return(
            <div className="master">
                <NavBox/>
                
                {this.props.children}
            </div>
        );
    }
}