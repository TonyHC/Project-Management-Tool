import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import { setJWTToken } from "./utils/setJWTToken";
import { logout } from "./store/actions/security-actions";
import Layout from "./components/Layout/Layout";
import ReactRoutes from "./routes";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");
  setJWTToken(jwt);

  useEffect(() => {
    let timer;

    timer = setTimeout(() => {
      if (jwt && Object.keys(jwt).length > 0) {
        const decoded = jwt_decode(jwt);
        const currentTime = Date.now() / 1000;
  
        if (decoded.exp < currentTime) {
          dispatch(logout(navigate));
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [dispatch, navigate, jwt]);

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <ReactRoutes />
      </Suspense>
    </Layout>
  );
};

export default App;