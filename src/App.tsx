import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import routes from "./configs/routes";
import "./App.less";

function App() {
  return (
    <Switch>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(props: RouteComponentProps<any>) => <route.component />}
          />
        );
      })}
    </Switch>
  );
}

export default App;
