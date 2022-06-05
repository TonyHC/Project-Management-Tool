import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import ProjectTaskList from "./project-task/ProjectTaskList";

const ProjectBoard = () => {
  const params = useParams();
  const { projectId } = params;

  return (
    <div>
      <Link to={`/project-task-form/${projectId}`} className="btn btn-primary mb-3">
        <i className="fas fa-plus-circle"> Create Project Task</i>
      </Link>
      <br />
      <hr />
      <div className="row">
        <ProjectTaskList title="To Do" headerStyle="bg-danger" />
        <ProjectTaskList title="In Progress" headerStyle="bg-primary" />
        <ProjectTaskList title="Done" headerStyle="bg-success" />
      </div>
    </div>
  );
};

export default ProjectBoard;