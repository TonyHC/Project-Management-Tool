import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store/actions/security-actions";
import Login from "../../components/UserManagement/Login";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.security);

  const loginHandler = (loginRequest) => {
    dispatch(login({ loginRequest, navigate }));
  };

  return <Login onLogin={loginHandler} errors={errors} />;
};

export default LoginPage;