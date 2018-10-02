import React, { Component } from 'react'
import styled from 'styled-components'
import {
    Jumbotron
} from 'reactstrap'

export default class MainScreen extends Component{


    render(){
        return(
            <main className="darkBg" >
                <Jumbotron style={{margin: '0 2em'}}>
                    <h1>Oi, meu chapa?</h1>
                    <p>Já reparou que isso é uma mensagem de teste?</p>
                </Jumbotron>
            </main>
        );
    }

}