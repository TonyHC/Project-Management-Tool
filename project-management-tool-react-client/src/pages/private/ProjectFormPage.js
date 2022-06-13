import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ProjectForm from "../../components/Project/ProjectForm";
import { createProject, getProjectById } from "../../store/actions/project-actions";

const ProjectFormPage = () => {
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { errors, project } = useSelector((state) => state.project);
  const { projectId } = params;

  useEffect(() => {
    if (projectId) {
      dispatch(getProjectById({ projectId, navigate }));
      setEditMode(true);
    }
  }, [dispatch, projectId, navigate]);

  const createProjectHandler = (project) => {
    dispatch(createProject({ project, navigate }));
  };

  return (
    <ProjectForm
      onCreateProject={createProjectHandler}
      editMode={editMode}
      project={project}
      errors={errors}
    />
  );
};

export default ProjectFormPage;