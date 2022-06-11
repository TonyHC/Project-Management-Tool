import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import Layout from "./components/Layout/Layout";
import { createRoutes } from "./routes";
import { setJWTToken } from "./utils/setJWTToken";
import { logout } from "./store/actions/security-actions";

const jwt = localStorage.getItem("jwt");
setJWTToken(jwt);

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      const decoded = jwt_decode(jwt);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        dispatch(logout(history));
      }
    }
  }, [dispatch, history]);

  return (
    <Layout>
      {createRoutes}
    </Layout>
  );
};

export default App;