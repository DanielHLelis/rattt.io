import React, { Component } from 'react'
import {
} from 'react-bootstrap'
import $ from 'jquery'
import cheet from 'cheet.js'

import 'styles/ttt.css'

import TTT from 'components/TTTGrid'

export default class TradicionalScreen extends Component{
    render(){
        cheet('w i n', () => {
            $('#mark').html('Winner')
        });
        return(
            <main style={{
                alignItems: 'center',
            }} className="darkBg contentDiv">
                <TTT xSize={3} ySize={3} seq={3} players={2} symbols={{
                    '1': <span className='blockContent'>X</span>,
                    '2': <span className='blockContent'>O</span>
                }} />
            </main>

        );
    }
}