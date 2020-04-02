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
    const { goToFeed, goToLogin, goToProfile, page, token } = this.props

    const buttonLogin = <Button onClick={goToLogin} color="inherit">Login</Button>

    const buttonFeed = <Button onClick={goToFeed} color="inherit">Feed</Button>

    const buttonProfile = <Button onClick={goToProfile} color="inherit">Profile</Button>

    const buttonLogout =
      <IconButton color="inherit" onClick={this.logout}>
        <PowerSettingsNewRounded />
      </IconButton>

    let buttonsPersonalized
    switch (page) {

      case "login":
      case "detail":
        if (token !== null) {
          buttonsPersonalized =
            <div>
              {buttonFeed}
              {buttonProfile}
              {buttonLogout}
            </div>
        }
        break;

      case "feed":
        buttonsPersonalized =
          <div>
            {buttonProfile}
            {buttonLogout}
          </div>
        break;

      case "profile":
        buttonsPersonalized =
          <div>
            {buttonFeed}
            {buttonLogout}
          </div>
        break;
      
        case "register":
        buttonsPersonalized = buttonLogin
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
    goToLogin: () => dispatch(push(routes.root)),
    goToProfile: () => dispatch(push(routes.profile))
  }
}

export default connect(null, mapDispatchToProps)(Appbar);