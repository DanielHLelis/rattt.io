import React, { Component } from 'react'
import 'styles/master.css'

export default class Master extends Component{

    render(){
        return(
            <div>
                <p className="blue lt">Top</p>
                {this.props.children}
            </div>
        );
    }
}