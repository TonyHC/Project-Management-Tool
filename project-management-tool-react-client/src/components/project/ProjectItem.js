import React from "react";

const ProjectItem = () => {
  return (
    <div class="card card-body bg-light mb-3">
      <div class="row">
        <div class="col-md-2">
          <span class="mx-auto">REACT</span>
        </div>
        <div class="col-md-6">
          <h3>Spring / React Project</h3>
          <p>Project to create a Kanban Board with Spring Boot and React</p>
        </div>
        <div class="col-md-4">
          <ul class="list-group">
            <a href="#">
              <li class="list-group-item list-group-item-action">
                <i class="fa fa-flag-checkered me-2"></i>
                Project Board
              </li>
            </a>
            <a href="#">
              <li class="list-group-item list-group-item-action">
                <i class="fa fa-edit me-2"></i>
                Update Project Info
              </li>
            </a>
            <a href="#">
              <li class="list-group-item list-group-item-action">
                <i class="fa fa-minus-circle me-2"></i>
                Delete Project
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;