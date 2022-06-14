import React from "react";
import { Link } from "react-router-dom";

import ProjectTaskList from "./ProjectTask/ProjectTaskList";
import LoadingSpinner from "../UI/LoadingSpinner";

const ProjectBoard = (props) => {
  const loadProjectBoardContent = (projectTasks, errors) => {
    if (props.status === "success") {
      if (projectTasks.length === 0) {
        return (
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            <i className="fas fa-exclamation-triangle mb-1 me-2"></i>
            <strong>No Project Tasks were found!</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        );
      } else {
        return (
          <div className="row">
            <ProjectTaskList
              title="To Do"
              cardHeaderStyle="bg-danger"
              projectTasks={projectTasks}
            />
            <ProjectTaskList
              title="In Progress"
              cardHeaderStyle="bg-primary"
              projectTasks={projectTasks}
            />
            <ProjectTaskList
              title="Done"
              cardHeaderStyle="bg-success"
              projectTasks={projectTasks}
            />
          </div>
        );
      }
    } else if (props.status === "failed" && errors.projectNotFound) {
      return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="fas fa-exclamation-triangle mb-1 me-2"></i>
          <strong>{errors.projectNotFound}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      );
    } else {
      return <LoadingSpinner />;
    }
  };

  let content = loadProjectBoardContent(props.projectTasks, props.errors);

  return (
    <div>
      {!props.errors.projectNotFound && (
        <Link
          to={`/project-task-form/${props.projectId}`}
          className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
      )}
      {content}
    </div>
  );
}

export default React.memo(ProjectBoard);