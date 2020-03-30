import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import styled from 'styled-components'
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../../containers/Router'
import { PowerSettingsNewRounded } from '@material-ui/icons';



const ToolbarStyled = styled(Toolbar)`
display: flex;
justify-content: space-between;
`

class Appbar extends Component {


  logout = () => {
    this.props.goToLogin()
  }


  render() {
    const { goToFeed } = this.props
    let buttonsPersonalized
    switch (this.props.page) {
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
        buttonsPersonalized = <IconButton color="inherit" 
        onClick={this.logout}>
          <PowerSettingsNewRounded />
        </IconButton>
        break;

      default:
        buttonsPersonalized = ""
        break;
    }



    return (
      <div>
        <AppBar position="static">
          <ToolbarStyled variant="dense">
            <Typography variant="h6" color="inherit">
              4Reddit
          </Typography>
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