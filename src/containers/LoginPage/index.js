import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'

import Appbar from "../../components/Appbar";

import styled from 'styled-components';
import { TextField, Button } from "@material-ui/core";

const LoginWrapper = styled.div`
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
const FormLogin = styled.form`
display:flex;
flex-direction: column;
`
const ButtonStyled = styled(Button)`
margin: 1rem auto;
width: 150px;

`


class LoginPage extends Component {
  render() {
    const { goToRegister, goToFeed } = this.props
    return (
      <div>
        <Appbar />
        <LoginWrapper>
          <h1>Login</h1>

          <FormLogin autoComplete="on">
            <TextField id="email" label="E-mail" variant="outlined" margin="normal" />
            <TextField id="senha" label="Senha" variant="outlined" margin="normal" />
            <ButtonStyled onClick={goToFeed} type="submit" color="primary" variant="contained"> Entrar </ButtonStyled>
          </FormLogin>

          <ButtonStyled
            onClick={goToRegister}
            color="primary"
            variant="contained">
            Cadastrar </ButtonStyled>
        </LoginWrapper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToRegister: () => dispatch(push(routes.register)),
    goToFeed: () => dispatch(push(routes.feed))
  }
}

export default connect(null, mapDispatchToProps)(LoginPage);
