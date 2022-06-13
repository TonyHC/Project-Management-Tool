import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { resetPassword } from "../../store/actions/security-actions";
import ResetPassword from "../../components/UserManagement/ResetPassword";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors, user } = useSelector((state) => state.security);

  const resetPasswordHandler = (updatedUser) => {
    dispatch(resetPassword({ updatedUser, navigate }));
  };

  return <ResetPassword onResetPassword={resetPasswordHandler} user={user} errors={errors} />;
};

export default ResetPasswordPage;