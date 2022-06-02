import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ProjectItem from "./ProjectItem";
import { getProjects } from "../../store/project-actions";

const ProjectList = () => {
  const { projects } = useSelector((state) => state.project);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center mb-4">Projects</h1>
      <Link to="/project-form" className="btn btn-primary mb-3">
        Create a Project
      </Link>
      {projects &&
        projects.map((project) => (
          <ProjectItem
            key={project.projectIdentifier}
            name={project.projectName}
            identifier={project.projectIdentifier}
            description={project.projectDescription}
          />
        ))}
    </div>
  );
};

export default ProjectList;