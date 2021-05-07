import React from "react";
import { Route, Switch, Redirect, useParams } from "react-router-dom";
import DogList from "./DogList";
import DogDetail from "./DogDetail";
import { dogs } from "./App";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/dogs/">
        <DogList dogs={dogs} />
      </Route>
      <Route exact path="/dogs/:name">
        <DogDetail dogs={dogs} />
      </Route>
      <Redirect to="/dogs" />
    </Switch>
  );
};

export default Routes;
