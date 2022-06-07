import React from "react";
import { Link } from "react-router-dom";

import ProjectList from "./project/ProjectList";

const Dashboard = () => {
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