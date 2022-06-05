import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProjectTaskList from "./project-task/ProjectTaskList";
import { getProjectTasks } from "../../store/project-task-actions";

const ProjectBoard = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { projectId } = params;
  const { projectTasks } = useSelector(state => state.projectTask);

  useEffect(() => {
    if (projectId) {
      dispatch(getProjectTasks(projectId));
    }
  }, [dispatch, projectId]);

  console.log(projectTasks);

  return (
    <div>
      <Link to={`/project-task-form/${projectId}`} className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>
      <br />
      <hr />
      <div className="row">
        <ProjectTaskList title="To Do" headerStyle="bg-danger" projectTasks={projectTasks} />
        <ProjectTaskList title="In Progress" headerStyle="bg-primary" projectTasks={projectTasks} />
        <ProjectTaskList title="Done" headerStyle="bg-success" projectTasks={projectTasks} />
      </div>
    </div>
  );
};

export default ProjectBoard;