import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createProjectTask, getProjectTask, updateProjectTask } from "../../store/actions/project-task-actions";
import ProjectTaskForm from "../../components/ProjectBoard/ProjectTask/ProjectTaskForm";

const ProjectTaskFormPage = () => {
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { projectId, projectTaskSequence } = params;
  const { errors, projectTask } = useSelector((state) => state.projectTask);

  useEffect(() => {
    if (projectId && projectTaskSequence) {
      dispatch(getProjectTask({ projectId, projectTaskSequence, navigate }));
      setEditMode(true);
    }
  }, [dispatch, projectId, projectTaskSequence, navigate]);

  const createProjectTaskHandler = (newProjectTask) => {
    dispatch(
      createProjectTask({
        projectId,
        projectTask: newProjectTask,
        navigate
      })
    );
  };

  const updateProjectTaskHandler = (updatedProjectTask) => {
    dispatch(
      updateProjectTask({
        projectId,
        projectTaskSequence,
        projectTask: updatedProjectTask,
        navigate
      })
    );
  };

  return (
    <ProjectTaskForm
      onCreateProjectTask={createProjectTaskHandler}
      onUpdateProjectTask={updateProjectTaskHandler}
      editMode={editMode}
      projectId={projectId}
      projectTask={projectTask}
      errors={errors}
    />
  );
};

export default ProjectTaskFormPage