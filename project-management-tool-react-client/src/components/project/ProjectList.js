import React from "react";

import ProjectItem from "./ProjectItem";
import LoadingSpinner from "../UI/LoadingSpinner";

const ProjectList = (props) => {
  return (
    <div>
      {props.status === "loading" && <LoadingSpinner />}
      {props.projects &&
        props.projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
    </div>
  );
};

export default ProjectList;