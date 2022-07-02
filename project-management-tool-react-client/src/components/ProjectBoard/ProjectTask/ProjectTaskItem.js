import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteProjectTask } from "../../../store/actions/project-task-actions";

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
    cardHeaderStyles = "bg-info";
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
    <div className="card">
      <div
        className={`card-header d-flex justify-content-between ${cardHeaderStyles} text-white`}>
        <h6 className="card-sub-title">
          ID: {props.projectTask.projectSequence}
        </h6>

        <h6 className="card-title">Priority: {priority}</h6>
      </div>
      <div className="card-body bg-light">
        <h6 className="card-title">{props.projectTask.summary}</h6>

        <p className="card-text text-muted text-truncate ">
          {props.projectTask.acceptanceCriteria}
        </p>

        {props.projectTask.dueDate && (
          <div className="d-flex justify-content-start">
            <p className="card-text me-2">
              <strong>Due Date:</strong> {props.projectTask.dueDate}
            </p>
          </div>
        )}

        <div className="d-flex justify-content-end">
          <Link
            to={`/project-task-form/${props.projectTask.projectIdentifier}/${props.projectTask.projectSequence}`}>
            <i className="fas fa-pencil-alt fa-lg me-3"></i>
          </Link>

          <i className="fas fa-trash-alt fa-lg mt-1" onClick={deleteProjectTaskHandler}></i>
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskItem;