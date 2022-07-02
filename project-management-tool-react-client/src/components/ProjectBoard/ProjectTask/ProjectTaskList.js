import React from "react";
import { Draggable } from "react-beautiful-dnd";

import ProjectTaskItem from "./ProjectTaskItem";

const ProjectTaskList = (props) => {
  const getItemStyle = (isDragging, draggableStyle) => ({
    // Some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: `${props.grid} 0`,
    margin: `0 0 ${props.grid * 3}px 0`,

    // Change background colour if dragging
    background: isDragging ? "rgba(rgb(214, 229, 250, 0.1)" : "rgba(243, 248, 255, 0.1)",

    // Styles we need to apply on draggables
    ...draggableStyle
  });

  return (
    <div>
      {props.el.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}>
              <ProjectTaskItem projectTask={item} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default ProjectTaskList;