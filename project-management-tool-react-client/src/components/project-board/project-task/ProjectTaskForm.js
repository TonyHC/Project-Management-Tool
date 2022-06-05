import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProjectTaskForm = () => {
  const params = useParams();
  const { projectId } = params;

  return (
    <div className="col-md-8 m-auto">
      <Link to={`/projectBoard/${projectId}`}>
        <strong>Back to Project Board</strong>
      </Link>
      <h4 className="display-4 text-center mt-4">Add / Update Project Task</h4>
      <p className="lead text-center">Project Name + Project Code</p>
      <form>
        <div className="mb-3">
          <label htmlFor="summary" className="form-label">
            Summary
          </label>
          <input
            type="text"
            className="form-control"
            name="summary"
            id="summary"
            placeholder="Project Task summary"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="acceptanceCriteria" className="form-label">
            Acceptance Criteria
          </label>
          <textarea
            className="form-control"
            placeholder="Acceptance Criteria"
            name="acceptanceCriteria"
            id="acceptanceCriteria"
          ></textarea>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              name="dueDate"
              id="dueDate"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select className="form-control" name="priority" id="priority">
              <option value={0}>Select Priority</option>
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select className="form-control" name="status" id="status">
              <option value="">Select Status</option>
              <option value="TO_DO">TO DO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-grid gap-2">
              <Link to={`/projectBoard/${projectId}`} className="btn btn-secondary">
                Back to Project Board
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectTaskForm;
