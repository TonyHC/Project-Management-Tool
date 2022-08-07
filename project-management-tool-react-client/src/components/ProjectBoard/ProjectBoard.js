import React from "react";
import { Link } from "react-router-dom";

import ProjectTaskList from "./ProjectTask/ProjectTaskList";
import Alert from "../UI/Alert";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { setProjectTaskStatus } from "../../utils/setProjectTaskStatus";

const ProjectBoard = (props) => {
  const grid = 8;

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#D6E5FA" : "#F3F8FF",
    padding: grid * 2,
    overflowY: "hidden",
    scrollbarWidth: "thin",
    minHeight: "85%",
  });

  const loadProjectBoardContent = (projectTasks, errors) => {
    if (props.status === "success") {
      if (projectTasks.length === 0) {
        return (
          <Alert message="No Project Tasks were found!" variant="warning" />
        );
      } else {
        return (
          <div className="d-flex drag-and-drop mb-5">
            <div className="row mx-auto">
              <DragDropContext onDragEnd={props.onDragEnd}>
                {props.filteredProjectTasks.map((el, ind) => (
                  <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided, snapshot) => (
                      <div className="d-flex flex-column project-tasks-list list-border">
                        <h5 className="fw-bold text-center capitalize p-1 mt-3">
                          {setProjectTaskStatus(ind)
                            .replace("_", " ")
                            .toLowerCase()}
                        </h5>
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}
                        >
                          <ProjectTaskList el={el} grid={grid} />
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))}
              </DragDropContext>
            </div>
          </div>
        );
      }
    } else if (props.status === "failed" && errors.projectNotFound) {
      return (
        <Alert message={errors.projectNotFound} variant="danger" />
      );
    }
  };

  let content = loadProjectBoardContent(props.projectTasks, props.errors);

  return (
    <div>
      {!props.errors.projectNotFound && (
        <Link
          to={`/project-task-form/${props.projectId}`}
          className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
      )}
      {content}
    </div>
  );
};

export default React.memo(ProjectBoard);
