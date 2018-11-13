import React, { Component } from 'react'
import styled from 'styled-components'

import lelis from 'assets/devs/lelis.jpg'
import alface from 'assets/devs/alface.jpeg'
import samuel from 'assets/devs/zepeludo.jpeg'
import jonata from 'assets/devs/galaDeInf.jpeg'

import Particles from 'react-particles-js'
import ParticlesConfig from 'config/particles'

export default class Credits extends Component{


    render(){
        return(
            <main className="darkBg pdT0">
                <Particles params={ParticlesConfig['0']} className="particles" width={window.innerWidth} height={window.innerHeight}/>
                <Grid>
                    <DevLeft className="primary lt ct" >
                        <Title className="mhAuto mvAuto logo rainbow" >
                            Créditos
                        </Title>
                    </DevLeft>

                    <DevRight>
                        <DevData>
                            <Name className="white" >
                                Daniel Henrique Lelis
                            </Name>
                            <Description className="white sst">
                                Designer, desenvolvedor full-stack e estudante de informática no CEFET-MG
                            </Description>
                        </DevData>
                        <DevImage href="https://github.com/yMegaM" size="8em" src={lelis} />
                    </DevRight>

                    <DevLeft>
                        <DevImage href="https://github.com/Jonatanc05" size="8em" src={jonata} />
                        <DevDataL>
                            <Name className="white" >
                                Jônata N. Cirqueira
                            </Name>
                            <Description className="white sst">
                                Gamer, atoa, amante da sétima arte e estudante nas horas vagas
                            </Description>
                        </DevDataL>
                    </DevLeft>

                    <DevRight>
                        <DevData>
                            <Name className="white" >
                                Pedro César (Alface)
                            </Name>
                            <Description className="white sst">
                                Programador, estudante de Informática no CEFET-MG
                            </Description>
                        </DevData>
                        <DevImage href="https://github.com/PedroCesarMesquita" size="8em" src={alface} />   
                    </DevRight>

                    <DevLeft>
                        <DevImage href="https://github.com/spfa13" size="8em" src={samuel} />
                        <DevDataL>
                            <Name className="white" >
                                Samuel Pedro Fernandes Amorim
                            </Name>
                            <Description className="white sst">
                                Contribuição nas Ideias do Site, Aluno de Informática do CEFET MG
                            </Description>
                        </DevDataL>
                    </DevLeft>
                </Grid>
            </main>
        )
    }

}

const Title = styled.span`
    padding: 0.4em;
`;

const DevData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    margin: 1em 1em;
`;
const DevDataL = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 1em 1em;
`;


const Name = styled.h1`
    text-align: center;
`;

const Description = styled.p`
    /* margin: .1em 1em; */
`;

const DevRight = styled.div`
    text-align: right;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    flex: 1;
    background-color: #0004;
    @media only screen and (max-width: 425px){
        flex-direction: column;
    }
`;

const DevLeft = styled.div`
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
    min-height: var(--noHeaderHeight);
    display: grid;
    grid-template-rows: 0.35fr 1fr 1fr 1fr 1fr;
    `;

const ImageFrame = (props) => (
    <ImFrame {...props} >
        <img style={{width: '100%', height: '100%', pointerEvents: 'none'}} src={props.src} alt={props.alt} />
    </ImFrame>
)

const DevImage = styled(ImageFrame)`
    margin: 1em 2vw;
    border: .3em solid white;
    transition: .4s;
    transform-origin: 100% 50%;
    box-shadow: 1px 1px 4px #0004;
    cursor: pointer;
    @media only screen and (max-width: 425px){
        order: -1;
    }
    &:hover{
        height: 10em;
        width: 10em;
        /* transform: scale(1.2); */
    }
`;

const ImFrame = styled.a`
    overflow: hidden;
    width: ${props => props.size};
    height: ${props => props.size};
    border-radius: 50%;
`;