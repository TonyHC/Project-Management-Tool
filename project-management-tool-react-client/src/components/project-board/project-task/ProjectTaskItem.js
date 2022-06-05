import React from "react";
import { Link } from "react-router-dom";

const ProjectTaskItem = (props) => {
  return (
    <div className="card mb-1 bg-light">
      <div className="card-header">
        <strong>ID: projectSequence -- Priority: priorityString</strong>
      </div>
      <div className="card-body bg-light">
        <h5 className="card-title">project_task.summary</h5>
        <p className="card-text text-truncate ">project_task.acceptanceCriteria</p>
        <Link to={`/projectBoard/${props.projectIdentifier}`} className="btn btn-primary">
          View / Update
        </Link>

        <button className="btn btn-danger ms-4">Delete</button>
      </div>
    </div>
  );
};

export default ProjectTaskItem;
