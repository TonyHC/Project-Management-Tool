import React from "react";

import ProjectTaskItem from "./ProjectTaskItem";

const ProjectTaskList = (props) => {
  const updateProjectTaskTitleForFiltering = props.title
    .replace(" ", "_")
    .toUpperCase();
  const filteredProjectTasks = props.projectTasks.filter(
    (projectTask) => projectTask.status === updateProjectTaskTitleForFiltering
  );

  return (
    <div className="col-md-4">
      <div className={`card text-center mb-2 ${props.cardHeaderStyle}`}>
        <div className="card-header text-white">
          <h3>{props.title}</h3>
        </div>
      </div>

      {filteredProjectTasks &&
        filteredProjectTasks.map((projectTask) => (
          <ProjectTaskItem
            key={projectTask.id}
            identifier={projectTask.projectIdentifier}
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