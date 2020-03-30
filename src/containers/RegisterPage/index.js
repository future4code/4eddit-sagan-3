import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'

import Appbar from "../../components/Appbar";

import styled from 'styled-components';
import { TextField, Button } from "@material-ui/core";

const RegisterWrapper = styled.div`
display: flex;
flex-direction: column;
margin: 2rem auto;
width: 30vw;
min-height: 80vh;
justify-content: center;
@media screen and (max-device-width: 1200px){
 width: 90vw;
}
`
const FormRegister = styled.form`
display:flex;
flex-direction: column;
`
const ButtonStyled = styled(Button)`
margin: 1rem auto;
width: 150px;

`


class RegisterPage extends Component {

  handleSubmission = (event) => {
   event.preventDefault()
   const { goToLogin } = this.props
   goToLogin()
  }

  render() {
    return (
      <div>
        <Appbar />
        <RegisterWrapper>
          <h1>Cadastrar</h1>

          <FormRegister
            autoComplete="on"
            onSubmit={this.handleSubmission}>
            <TextField id="nome-do-usuario" label="Nome do Usuário" variant="outlined" margin="normal" />
            <TextField id="email" label="E-mail" variant="outlined" margin="normal" />
            <TextField id="senha" label="Senha" variant="outlined" margin="normal" />

            <ButtonStyled type="submit" color="primary" variant="contained"> Cadastrar </ButtonStyled>
          </FormRegister>
        </RegisterWrapper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToLogin: () => dispatch(push(routes.root))
  }
}

export default connect(null, mapDispatchToProps)(RegisterPage);