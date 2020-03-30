import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Appbar from "../../components/Appbar";


class LoginPage extends Component {
  render() {
    return (
      <div>
        <Appbar />
        <Button color="primary" variant="contained"> Clica em mim</Button>
        <Button color="secondary" variant="contained"> Clica em mim de novo</Button>
        LoginPage
      </div>
    );
  }
}

export default LoginPage;
