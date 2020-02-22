import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ condition, deniedPath, children, ...otherProps }) => (
  <Route {...otherProps}>
    {
      condition ? children : <Redirect to={deniedPath} />
    }
  </Route>
);

export default PrivateRoute;