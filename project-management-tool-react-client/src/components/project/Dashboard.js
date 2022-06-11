import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProjectList from "./ProjectList";
import { getUserById } from "../../store/actions/security-actions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.security);

  useEffect(() => {
    dispatch(getUserById(user.id));
  }, [dispatch, user.id]);

  return (
    <div>
      <h1 className="text-center mb-4">Projects</h1>
      <Link to="/project-form" className="btn btn-primary mb-3">
        Create a Project
      </Link>
      <ProjectList />
    </div>
  );
};

export default Dashboard;