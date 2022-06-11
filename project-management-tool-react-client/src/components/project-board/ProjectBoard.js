import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProjectTaskList from "./project-task/ProjectTaskList";
import { getProjectTasks } from "../../store/project-task-actions";
import LoadingSpinner from "../ui/LoadingSpinner";

const ProjectBoard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { projectId } = params;
  const { errors, projectTasks, status } = useSelector((state) => state.projectTask);

  useEffect(() => {
    dispatch(getProjectTasks(projectId));
  }, [dispatch, projectId]);

  const loadProjectBoardContent = (projectTasks, errors) => {
    if (status === "success") {
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
    } else if (status === "failed") {
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

  let content = loadProjectBoardContent(projectTasks, errors);

  return (
    <div>
      {!errors.projectNotFound && (
        <Link
          to={`/project-task-form/${projectId}`}
          className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
      )}
      {content}
    </div>
  );
}

export default ProjectBoard;