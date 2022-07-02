import React, { useEffect } from "react";
import useState from 'react-usestateref';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProjectTasks, updateProjectTasksOrder } from "../../store/actions/project-task-actions";
import ProjectBoard from "../../components/ProjectBoard/ProjectBoard";
import Titles from "../../components/ProjectBoard/ProjectTask/ProjectTaskTitle";
import { projectTaskStatus } from "../../utils/projectTaskStatus";

const ProjectBoardPage = () => {
  const [filteredProjectTasks, setFilteredProjectTasks, filteredProjectTasksRef] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const { projectId } = params;
  const { errors, projectTasks, status } = useSelector((state) => state.projectTask);

  useEffect(() => {
    dispatch(getProjectTasks(projectId));
  }, [dispatch, projectId]);


  useEffect(() => {
    if (projectTasks) {
      setFilteredProjectTasks(
        [
          projectTasks.filter((pT) => pT.status === Titles.To_Do),
          projectTasks.filter((pT) => pT.status === Titles.In_Progress),
          projectTasks.filter((pT) => pT.status === Titles.Done)
        ]
      )
    }
  }, [projectTasks, setFilteredProjectTasks]);

  // Reorders a item from the same list
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);

    // Reorders a item from bottom to top
    for (let i = endIndex; i < startIndex; i++) {
      const oP1 = result[i].position;
      result[i] = {...result[i], position: result[i + 1].position};
      result[i + 1] = {...result[i + 1], position: oP1};
    }

    // Reorders a item from top to bottom
    for (let i = endIndex; i > startIndex; i--) {
      const oP1 = result[i].position;
      result[i] = {...result[i], position: result[i - 1].position};
      result[i - 1] = {...result[i - 1], position: oP1};
    }

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // Moves an item from one list to another list.
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    const updatedProjectTask = {
      ...removed,
      status: projectTaskStatus(+droppableDestination.droppableId),
    };

    destClone.splice(droppableDestination.index, 0, updatedProjectTask);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    const newState = [...filteredProjectTasks];

    if (sInd === dInd) {
      const items = reorder(filteredProjectTasks[sInd], source.index, destination.index);
      newState[sInd] = items;
    } else {
      const result = move(filteredProjectTasks[sInd], filteredProjectTasks[dInd], source, destination);
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];
    }

    setFilteredProjectTasks(newState);

    const combinedStatesArr = [].concat(...filteredProjectTasksRef.current);
    dispatch(updateProjectTasksOrder({ projectId, projectTasks: combinedStatesArr }));
  };

  return (
    <ProjectBoard
      projectTasks={projectTasks}
      status={status}
      errors={errors}
      projectId={projectId}
      filteredProjectTasks={filteredProjectTasks}
      onDragEnd={onDragEnd}
    />
  );
};

export default ProjectBoardPage;