import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { isAuth } = useSelector((state) => state.security);
  const location = useLocation();

  return isAuth ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location }
      }}
    />
  );
};

export default ProtectedRoute;