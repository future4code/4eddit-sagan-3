import React from 'react'
import { CircularProgress } from "@material-ui/core";
import { BackdropStyled } from './styles'

export default class Loading extends React.Component{
    render(){
        const { open } = this.props
        return(
                <BackdropStyled open={open}>
                    <CircularProgress/> 
                </BackdropStyled>
        )
    }
}