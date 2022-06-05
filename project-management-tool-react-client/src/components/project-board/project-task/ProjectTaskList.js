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

      {/* <!-- SAMPLE PROJECT TASK STARTS HERE --> */}
      <ProjectTaskItem />
      {/* <!-- SAMPLE PROJECT TASK ENDS HERE --> */}
    </div>
  );
};

export default ProjectTaskList;
