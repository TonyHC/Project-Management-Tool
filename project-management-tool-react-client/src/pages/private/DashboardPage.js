import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dashboard from "../../components/Project/Dashboard";

import { getUserById } from "../../store/actions/security-actions";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.security);

  useEffect(() => {
    dispatch(getUserById(user.id));
  }, [dispatch, user.id]);

  return <Dashboard />;
};

export default DashboardPage;