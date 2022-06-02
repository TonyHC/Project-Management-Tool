import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = (props) => {
  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-md-2">
          <span className="mx-auto">{props.identifier}</span>
        </div>
        <div className="col-md-6">
          <h3>{props.name}</h3>
          <p>{props.description}</p>
        </div>
        <div className="col-md-4">
          <ul className="list-group">
            <Link to="#">
              <li className="list-group-item list-group-item-action">
                <i className="fa fa-flag-checkered me-2"></i>
                Project Board
              </li>
            </Link>
            <Link to="#">
              <li className="list-group-item list-group-item-action">
                <i className="fa fa-edit me-2"></i>
                Update Project Info
              </li>
            </Link>
            <Link to="#">
              <li className="list-group-item list-group-item-action">
                <i className="fa fa-minus-circle me-2"></i>
                Delete Project
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;