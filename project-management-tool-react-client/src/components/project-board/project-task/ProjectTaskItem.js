import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteProjectTask } from "../../../store/project-task-actions";

const ProjectTaskItem = (props) => {
  const dispatch = useDispatch();

  let priority;
  let cardHeaderStyles;

  if (props.projectTask.priority === 1) {
    priority = "HIGH";
    cardHeaderStyles = "bg-danger";
  } else if (props.projectTask.priority === 2) {
    priority = "MEDIUM";
    cardHeaderStyles = "bg-warning";
  } else if (props.projectTask.priority === 3) {
    priority = "LOW";
    cardHeaderStyles = "bg-primary";
  }

  const deleteProjectTaskHandler = () => {
    dispatch(
      deleteProjectTask({
        projectId: props.projectTask.projectIdentifier,
        projectTaskSequence: props.projectTask.projectSequence
      })
    );
  };

  return (
    <div className="card mb-3 bg-light">
      <div className={`card-header d-flex justify-content-between ${cardHeaderStyles} text-white`}>
        <span>ID: {props.projectTask.projectSequence}</span>
        <span>Priority: {priority}</span>
      </div>
      <div className="card-body bg-light">
        <div className={"d-flex justify-content-between"}>
          <h5 className="card-title">{props.projectTask.summary}</h5>
          {props.projectTask.dueDate && (
            <p className="card-text">
              <strong>Due Date:</strong>
            </p>
          )}
        </div>
        <div className={"d-flex justify-content-between"}>
          <p className="card-text text-truncate ">
            {props.projectTask.acceptanceCriteria}
          </p>
          <p className="card-text">{props.projectTask.dueDate}</p>
        </div>
        <div className={"d-flex justify-content-between"}>
          <Link
            to={`/project-task-form/${props.projectTask.projectIdentifier}/${props.projectTask.projectSequence}`}
            className="btn btn-info text-white">
            Update Project Task
          </Link>

          <button className="btn btn-danger ms-4" onClick={deleteProjectTaskHandler}>
            Delete Project Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskItem;