import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../../containers/Router'

import { AppBar, Button, IconButton } from "@material-ui/core";
import { PowerSettingsNewRounded } from '@material-ui/icons';

import { ToolbarStyled, Logo } from './styles'

class Appbar extends Component {

  logout = () => {
    localStorage.clear()
    this.props.goToLogin()
  }

  render() {
    const { goToFeed, goToLogin, page, token } = this.props

    let buttonsPersonalized
    switch (page) {

      case "detail":
        buttonsPersonalized =
          <div>
            <Button onClick={goToFeed} color="inherit">Feed</Button>
            <IconButton color="inherit" onClick={this.logout}>
              <PowerSettingsNewRounded />
            </IconButton>
          </div>
        break;

      case "feed":
        buttonsPersonalized =
          <IconButton color="inherit" onClick={this.logout}>
            <PowerSettingsNewRounded />
          </IconButton>
        break;

      case "register":
        buttonsPersonalized =
          <Button onClick={goToLogin} color="inherit">Login</Button>
        break;

      case "login":
        if (token !== null) {
          buttonsPersonalized =
            <Button onClick={goToFeed} color="inherit">Feed</Button>
        }
        break;

      default:
        buttonsPersonalized = ""
        break;
    }

    return (
      <div>
        <AppBar position="static">
          <ToolbarStyled variant="dense">

            <Logo variant="h6" color="inherit" onClick={goToLogin}>
              4eddit
            </Logo>

            {buttonsPersonalized}

          </ToolbarStyled>
        </AppBar>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToFeed: () => dispatch(push(routes.feed)),
    goToLogin: () => dispatch(push(routes.root))
  }
}

export default connect(null, mapDispatchToProps)(Appbar);