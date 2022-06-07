import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteProjectById } from "../../store/project-actions";

const ProjectItem = (props) => {
  const dispatch = useDispatch();

  const deleteProjectHandler = () => {
    dispatch(deleteProjectById(props.project.projectIdentifier));
  };

  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-md-3">
          <span className="mx-auto">{props.project.projectIdentifier}</span>
        </div>
        <div className="col-md-5">
          <h3>{props.project.projectName}</h3>
          <p>{props.project.projectDescription}</p>
          {props.project.startDate && props.project.endDate && (
            <span>
              {props.project.startDate} to {props.project.endDate}
            </span>
          )}
        </div>
        <div className="col-md-4">
          <ul className="list-group">
            <Link to={`/project-board/${props.project.projectIdentifier}`}>
              <li className="list-group-item list-group-item-action">
                <i className="fa fa-flag-checkered me-2"></i>
                Project Board
              </li>
            </Link>
            <Link to={`/project-form/${props.project.projectIdentifier}`}>
              <li className="list-group-item list-group-item-action">
                <i className="fa fa-edit me-2"></i>
                Update Project Info
              </li>
            </Link>
            <li className="list-group-item list-group-item-action" onClick={deleteProjectHandler}>
              <i className="fa fa-minus-circle me-2"></i>
              Delete Project
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;