import React, { Component } from "react";

import Appbar from "../../components/Appbar";

import { TextField } from "@material-ui/core";

import { ButtonStyled, FormRegister, RegisterWrapper } from './styles'

class RegisterPage extends Component {

  handleSubmission = (event) => {
    event.preventDefault()

    alert('Cadastro efetuado com sucesso!') // pode ir pras actions quando integrar com a API
  }

  render() {
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
            />

            <TextField 
              id="email" label="E-mail" variant="outlined" margin="normal"
              type="email"
            />

            <TextField 
              id="senha" label="Senha" variant="outlined" margin="normal"
              type="password"
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

export default RegisterPage;