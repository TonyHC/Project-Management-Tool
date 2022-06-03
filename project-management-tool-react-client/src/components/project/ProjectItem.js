import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteProjectById } from "../../store/project-actions";

const ProjectItem = (props) => {
  const dispatch = useDispatch();

  const deleteProjectHandler = () => {
    dispatch(deleteProjectById(props.identifier));
  };

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
            <Link to={`/project-form/${props.identifier}`}>
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
