import React from "react";
import { Link } from "react-router-dom";

import ProjectList from "./ProjectList";

const Dashboard = (props) => {
  return (
    <div className="col-md-10 m-auto">
      <h1 className="text-center mb-4">Projects</h1>
      <Link to="/project-form" className="btn btn-primary mb-3">
       <i className="fas fa-plus-circle"> Create Project</i>
      </Link>
      {props.projects.length === 0 && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert">
          <i className="fas fa-exclamation-triangle mb-1 me-2"></i>
          <strong>No Projects exist!</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <ProjectList projects={props.projects} status={props.status} />
    </div>
  );
};

export default React.memo(Dashboard);