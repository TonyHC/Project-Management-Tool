import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProjectTasks } from "../../store/actions/project-task-actions";
import ProjectBoard from "../../components/ProjectBoard/ProjectBoard";

const ProjectBoardPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { projectId } = params;
  const { errors, projectTasks, status } = useSelector((state) => state.projectTask );

  useEffect(() => {
    dispatch(getProjectTasks(projectId));
  }, [dispatch, projectId]);

  return (
    <ProjectBoard
      projectTasks={projectTasks}
      status={status}
      errors={errors}
      projectId={projectId}
    />
  );
};

export default ProjectBoardPage;