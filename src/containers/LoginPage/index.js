import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'

import Appbar from "../../components/Appbar";

import { TextField, Button, Typography } from "@material-ui/core";

import { ButtonStyled, FormLogin, LoginWrapper, RegisterWrapper } from './styles'

class LoginPage extends Component {
  render() {
    const { goToRegister, goToFeed } = this.props
    
    const token = localStorage.getItem('token') // vamos setar ele no login
    const username = localStorage.getItem('username')

    return (
      <>
        <Appbar page={'login'}
          token={token}
        />

        <LoginWrapper>

          {token ?

            <Typography variant="h4" color="textSecondary" component="p">
              Bem vindx {username}
            </Typography>

            :

            <>
              <h1>Login</h1>

              <FormLogin autoComplete="on">
                <TextField
                  id="email" label="E-mail" variant="outlined" margin="normal"
                  type="email"
                />
                <TextField
                  id="senha" label="Senha" variant="outlined" margin="normal"
                  type="password"
                />
                <ButtonStyled onClick={goToFeed} type="submit" color="primary" variant="contained"> Entrar </ButtonStyled>
              </FormLogin>

              <RegisterWrapper>
                <Typography variant="subtitle1" color="textSecondary" component="p">
                  Não tem cadastro? <Button color="primary" onClick={goToRegister}>
                    Criar conta
              </Button>
                </Typography>
              </RegisterWrapper>
            </>
          }

        </LoginWrapper>


      </>
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
