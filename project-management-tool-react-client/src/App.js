import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import { setJWTToken } from "./utils/setJWTToken";
import { logout } from "./store/actions/security-actions";
import Layout from "./components/Layout/Layout";
import ReactRoutes from "./routes";

const jwt = localStorage.getItem("jwt");
setJWTToken(jwt);

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      const decoded = jwt_decode(jwt);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        dispatch(logout(navigate));
      }
    }
  }, [dispatch, navigate]);

  return (
    <Layout>
      <ReactRoutes />
    </Layout>
  );
};

export default App;