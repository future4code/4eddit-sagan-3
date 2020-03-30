import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import DetailPage from "../DetailPage";
import FeedPage from "../FeedPage";
import RegisterPage from "../RegisterPage";


export const routes = {
  root: "/",
  register: "/register",
  feed: "/posts/feed",
  detail: "/posts/detail"

};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={LoginPage} />
        <Route exact path={routes.register} component={RegisterPage} />
        <Route exact path={routes.feed} component={FeedPage} />
        <Route exact path={routes.detail} component={DetailPage} />
        
        <Route path="*" component={() => "Página não encontrada"} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
