import React, { Component } from 'react'
import NavBox from 'components/NavBar'
import 'styles/master.css'

export default class Master extends Component{

    render(){
        return(
            <div className="master">
                <NavBox/>
                {this.props.children}
            </div>
        );
    }
}