import React, { Component } from 'react'
import styled from 'styled-components'

import Particles from 'react-particles-js'
import ParticlesConfig from 'config/particles'

export default class StartPage extends Component{
    render(){
        return(
            <main className="darkBg contentDiv pdT0" >
                <Particles params={ParticlesConfig['0']} className="particles" width={window.innerWidth} height={window.innerHeight}/>
                <Grid  >
                    <Right>
                        <div className="flexC mhAuto mvAuto" >
                            <span className="white st" >
                                <span className="logo blue lt rainbow" >Bots!</span>
                            </span>
                            <span className="white sst" > O destaque da versão! </span>
                        </div>
                    </Right>
                    <Left>
                        <DataL>
                            <Name className="logo blue lt" >
                                Brandom
                            </Name>
                            <Description className="white" >
                                Um amador viciado, joga por diversão, pelo menos é o que parece, apesar de
                                 frequentemente colocar dinheiro em seus jogos. Acredita muito na sorte e
                                 diz que jogando uma quantidade suficiente de partidas, jogando em casas
                                 aleatórias, eventualmente ganhará algum jogo em sua vida, por isso nunca
                                 para de jogar freneticamente, sem sequer pensar marca qualquer casa.
                            </Description>
                        </DataL>
                    </Left>
                    <Right>
                        <DataR>
                            <Name className="logo blue lt" >
                                Greed
                            </Name>
                            <Description className="white" >
                                É um profissional, joga por dinheiro, suas jogadas sao calculadas,
                                 ele nao deixa qualquer um passá-lo para trás. Vive apostando dinheiro
                                 em seus jogos, principalmente quando avista novos jogadores dos quais pode
                                 tirar proveito. Mas sua ganância o impede de se tornar perfeito, quando se
                                 vê em vantagem faz jogadas mal pensadas apenas visando a vitória e assim pode
                                 ser punido por um bom oponente. Mas se perguntá-lo ele dirá que chegará o dia
                                 em que ficará milionário com suas apostas, e ninguém vencerá dele, nem mesmo Minnie.
                            </Description>
                        </DataR>
                    </Right>
                    <Left>
                        <DataL>
                            <Name className="logo blue lt" >
                                Minnie
                            </Name>
                            <Description className="white" >
                                A campeã das campeãs, quando Minnie começou a jogar era sempre zoada por ser mulher,
                                 e ninguém jamais admitia ter perdido para ela. Segundo ela isso a tornou mais forte e lhe deu capacidades,
                                 capacidades essas inegáveis, já que ninguém mais se lembra de alguma derrota dela. Os melhores campeões do mundo vieram desafiá-la
                                 a subestimando e saíram envergonhados por suas jogadas extreamente calculistas, pensa tanto em cada jogada que parece analisar todas
                                 as possibilidades, o que explicaria por que ela não joga em tabuleiros grandes. Voce diz que será diferente com voce? Desejo-lhe boa sorte,
                                 mas minhas fichas estão nela.
                            </Description>
                        </DataL>
                    </Left>
                </Grid>
            </main>
        )
    }

}

const DataR = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    margin: 1em 2em;
    max-width: 50vw;
    transition: .3s;
    & *{
        transition: .3s;
    }
    @media only screen and (max-width: 475px){
        max-width: 95vw;
    }
    & > .logo{
        transform-origin: 100% 50%;
    }
    &:hover > .logo{
        transform: scale(1.4);
    }
`;
const DataL = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 1em 2em;
    max-width: 50vw;
    transition: .3s;
    & *{
        transition: .3s;
    }
    @media only screen and (max-width: 475px){
        max-width: 95vw;
    }
    & > .logo{
        transform-origin: 0% 50%;
    }
    &:hover > .logo{
        transform: scale(1.4);
    }
`;


const Name = styled.h1`
    text-align: center;
`;

const Description = styled.p`
    text-align: justify;
    text-indent: 4em;
    line-height: 2em;
`;

const Right = styled.div`
    background-color: #0004;
    text-align: right;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    flex: 1;
    @media only screen and (max-width: 425px){
        flex-direction: column;
    }
    `;

const Left = styled.div`
    background-color: #0003;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    flex: 1;
    @media only screen and (max-width: 425px){
        flex-direction: column;
    }
`;


const Grid = styled.div`
    width: 100%;
    min-height: var(--noHeaderHeight);
    display: grid;
    grid-template-rows: 0.25fr 1fr 1fr 1fr;
    `;
