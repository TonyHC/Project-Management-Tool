import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Dashboard from "../../components/Project/Dashboard";

import { getUserById } from "../../store/actions/security-actions";
import { getProjects } from "../../store/actions/project-actions"; 

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.security);
  const { projects, status } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getUserById(user.id));
    dispatch(getProjects());
  }, [dispatch, user.id]);

  return <Dashboard projects={projects} status={status} />;
};

export default DashboardPage;