import React, { Component } from "react";
import { signup } from '../../actions'

import Appbar from "../../components/Appbar";

import { TextField } from "@material-ui/core";

import { ButtonStyled, FormRegister, RegisterWrapper } from './styles'
import { connect } from "react-redux";

class RegisterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registerData: {}
    }
  }

  handleSubmission = (event) => {
    event.preventDefault()
    this.props.signup(this.state.registerData)
    this.setState ({
      registerData: {
        [event.target.name]: ""
      }
    })
  }

  handleTextFieldChange = (event) => {
    this.setState({
      registerData: {
        ...this.state.registerData,
        [event.target.name]: event.target.value
      }
    })
  }

  render() {
    // console.log(this.state.registerData)
    return (
      <>
        <Appbar page={'register'} />
        
        <RegisterWrapper>
          <h1>Cadastrar</h1>

          <FormRegister
            autoComplete="on"
            onSubmit={this.handleSubmission}> 

            <TextField
              id="nome-do-usuario" label="Nome do Usuário" variant="outlined" margin="normal"
              type="text"
              required
              inputProps={{
                pattern: "[a-z]{3,}",
                title: "O campo Nome do Usuário  deve ter no mínimo 3 letras minúsculas, sem espaço.",
              }}
              name="username"
              value={this.state.registerData.username || ""}
              onChange={this.handleTextFieldChange}
            />

            <TextField 
              id="email" label="E-mail" variant="outlined" margin="normal"
              type="email"
              required
              name="email"
              value={this.state.registerData.email || ""}
              onChange={this.handleTextFieldChange}
            />

            <TextField 
              id="senha" label="Senha" variant="outlined" margin="normal"
              type="password"
              required
              inputProps={{
                pattern: "[A-Za-z0-9]{5,}", 
                title:"O campo Senha deve ter no mínimo 5 letras ou números, sem espaço.",
              }}
              name="password"
              value={this.state.registerData.password || ""}
              onChange={this.handleTextFieldChange}
            />

            <ButtonStyled type="submit" color="primary" variant="contained">
              Cadastrar
            </ButtonStyled>
          </FormRegister>
          
        </RegisterWrapper>

      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup:(registerData) => dispatch(signup(registerData))
  }
}

export default connect(null, mapDispatchToProps)(RegisterPage);