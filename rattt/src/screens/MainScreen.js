import React, { Component } from 'react'
import {
    Jumbotron
} from 'react-bootstrap'

export default class MainScreen extends Component{


    render(){
        return(
            <main className="darkBg" >
                <Jumbotron style={{margin: '0 2em'}}>
                    <h1 className="lt blue">Oi, meu chapa?</h1>
                    <p className="st">Já reparou que isso é uma mensagem de teste?</p>
                </Jumbotron>
            </main>
        );
    }

}