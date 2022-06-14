import React from "react";
import { Link } from "react-router-dom";

import ProjectList from "./ProjectList";

const Dashboard = (props) => {
  return (
    <div className="col-md-10 m-auto">
      <h1 className="text-center mb-4">Projects</h1>
      <Link to="/project-form" className="btn btn-primary mb-3">
        Create a Project
      </Link>
      <ProjectList projects={props.projects} status={props.status} />
    </div>
  );
};

export default React.memo(Dashboard);