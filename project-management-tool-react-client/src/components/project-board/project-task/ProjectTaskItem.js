import React from "react";
import { Link } from "react-router-dom";

const ProjectTaskItem = (props) => {
  let priority;
  let cardHeaderStyles;

  if (props.priority === 1) {
    priority = "HIGH";
    cardHeaderStyles = "card-header bg-danger";
  } else if (props.priority === 2) {
    priority = "MEDIUM";
    cardHeaderStyles = "card-header bg-warning";
  } else if (props.priority === 3) {
    priority = "LOW";
    cardHeaderStyles = "card-header bg-info";
  }

  return (
    <div className="card mb-1 bg-light">
      <div className={`d-flex justify-content-between ${cardHeaderStyles}`}>
        <strong>ID: {props.projectSequence}</strong>
        <strong>Priority: {priority}</strong>
      </div>
      <div className="card-body bg-light">
        <h5 className="card-title">{props.summary}</h5>
        <p className="card-text text-truncate ">{props.acceptanceCriteria}</p>
        <Link
          to={`/project-task-form/${props.identifier}/${props.projectSequence}`}
          className="btn btn-primary"
        >
          View / Update
        </Link>

        <button className="btn btn-danger ms-4">Delete</button>
      </div>
    </div>
  );
};

export default ProjectTaskItem;
