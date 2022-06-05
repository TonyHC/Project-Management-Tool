import React from "react";

import ProjectTaskItem from "./ProjectTaskItem";

const ProjectTaskList = (props) => {
  return (
    <div className="col-md-4">
      <div className={`card text-center mb-2 ${props.headerStyle}`}>
        <div className="card-header text-white">
          <h3>{props.title}</h3>
        </div>
      </div>

      {props.projectTasks &&
        props.projectTasks.map((projectTask) => (
          <ProjectTaskItem
            key={projectTask.id}
            projectSequence={projectTask.projectSequence}
            summary={projectTask.summary}
            acceptanceCriteria={projectTask.acceptanceCriteria}
            priority={projectTask.priority}
          />
        ))}
    </div>
  );
};

export default ProjectTaskList;