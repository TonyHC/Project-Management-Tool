import React from "react";
import { Link } from "react-router-dom";

import ProjectList from "./ProjectList";
import Alert from "../UI/Alert";

const Dashboard = (props) => {
  return (
    <div className="col-md-10 m-auto">
      <h1 className="text-center mb-4">Projects</h1>
      <Link to="/project-form" className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle"> Create Project</i>
      </Link>
      {props.projects.length === 0 && (
        <Alert message="No Projects exist!" variant="warning" />
      )}
      <ProjectList projects={props.projects} status={props.status} />
    </div>
  );
};

export default React.memo(Dashboard);
