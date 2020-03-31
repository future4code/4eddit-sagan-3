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
              required
              inputProps={{
                pattern: "[a-z]{3,}", 
                title:"O campo Nome do Usuário  deve ter no mínimo 3 letras minúsculas, sem espaço.",
              }}
            />

            <TextField 
              id="email" label="E-mail" variant="outlined" margin="normal"
              type="email"
              required
            />

            <TextField 
              id="senha" label="Senha" variant="outlined" margin="normal"
              type="password"
              required
              inputProps={{
                pattern: "[A-Za-z0-9]{5,}", 
                title:"O campo Senha deve ter no mínimo 5 letras ou números, sem espaço.",
              }}
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