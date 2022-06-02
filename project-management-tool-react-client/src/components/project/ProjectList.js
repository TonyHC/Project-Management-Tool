import React from "react";
import ProjectItem from "./ProjectItem";

const ProjectList = () => {
  return (
    <div>
      <h1 className="text-center mb-4">Projects</h1>
      <a href="#CMP" className="btn btn-primary mb-3">Create a Project</a>
      <ProjectItem />
    </div>
  );
};

export default ProjectList;
