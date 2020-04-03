import React from 'react'
import { CircularProgress } from "@material-ui/core";
import { BackdropStyled } from './styles'

export default class Loading extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            open: this.props.open
        }
    }
    
    handleClose = () => { // a pessoa pode fechar se algo der errado
        this.setState({open: false});
     };

    render(){
        const { open } = this.state
        return(
                <BackdropStyled open={open} onClick={this.handleClose}>
                    <CircularProgress/> 
                </BackdropStyled>
        )
    }
}