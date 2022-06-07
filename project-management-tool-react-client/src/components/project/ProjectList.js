import React, { useEffect } from "react";
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
      {projects &&
        projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
    </div>
  );
};

export default ProjectList;