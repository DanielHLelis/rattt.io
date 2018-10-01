import React, { Component } from 'react'
import 'styles/master.css'

export default class Master extends Component{

    render(){
        return(
            <div>
                <p style={{position: 'absolute'}}className="blue lt header">Top</p>
                {this.props.children}
            </div>
        );
    }
}