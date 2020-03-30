import React, { Component } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";


class Appbar extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              4Reddit
          </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Appbar;