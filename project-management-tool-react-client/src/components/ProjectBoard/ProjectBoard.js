import React from "react";
import { Link } from "react-router-dom";

import ProjectTaskList from "./ProjectTask/ProjectTaskList";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { projectTaskStatus } from "../../utils/projectTaskStatus";

const ProjectBoard = (props) => {
  const grid = 8;

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#D6E5FA" : "#F3F8FF",
    padding: grid * 2,
    overflowY: "hidden",
    scrollbarWidth: "thin",
    minHeight: "85%"
  });

  const loadProjectBoardContent = (projectTasks, errors) => {
    if (props.status === "success") {
      if (projectTasks.length === 0) {
        return (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert">
            <i className="fas fa-exclamation-triangle mb-1 me-2"></i>
            <strong>No Project Tasks were found!</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
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
                            {projectTaskStatus(ind).replace("_", " ").toLowerCase()}
                        </h5>
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}>
                          <ProjectTaskList el={el} grid={grid}/>
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
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert">
          <i className="fas fa-exclamation-triangle mb-1 me-2"></i>
          <strong>{errors.projectNotFound}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
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