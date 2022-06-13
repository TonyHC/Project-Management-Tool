import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../store/actions/security-actions";
import Register from "../../components/UserManagement/Register";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.security);

  const registerHandler = (newUser) => {
    dispatch(register({ newUser, navigate }));
  };

  return <Register onRegister={registerHandler} errors={errors} />;
};

export default RegisterPage;