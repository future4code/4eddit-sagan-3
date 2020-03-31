import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'
import { login } from '../../actions'

import Appbar from "../../components/Appbar";

import { TextField, Button, Typography } from "@material-ui/core";

import { ButtonStyled, FormLogin, LoginWrapper, RegisterWrapper } from './styles'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginData: {}
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.login(this.state.loginData)
  }

  handleTextFieldChange = (event) => {
    this.setState({
      loginData: {
        ...this.state.loginData,
        [event.target.name]: event.target.value
      }
    })
  }

  render() {
    // console.log(this.state.loginData)
    const { goToRegister } = this.props

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

              <FormLogin autoComplete="on" onSubmit={this.handleSubmit}>
                <TextField
                  id="email" label="E-mail" variant="outlined" margin="normal"
                  type="email"
                  required
                  name="email"
                  value={this.state.loginData.email || ""}
                  onChange={this.handleTextFieldChange}
                />
                <TextField
                  id="senha" label="Senha" variant="outlined" margin="normal"
                  type="password"
                  required
                  name="password"
                  value={this.state.loginData.password || ""}
                  onChange={this.handleTextFieldChange}
                />
                <ButtonStyled type="submit" color="primary" variant="contained"> Entrar </ButtonStyled>
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
    login: (loginData) => dispatch(login(loginData))
  }
}

export default connect(null, mapDispatchToProps)(LoginPage);
