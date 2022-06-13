import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

const initialInputState = {
  summary: "",
  acceptanceCriteria: "",
  dueDate: "",
  priority: 0,
  status: ""
};

const ProjectTaskForm = (props) => {
  const [inputState, setInputState] = useState(initialInputState);

  useEffect(() => {
    let timer;

    if (Object.keys(props.projectTask).length > 0 && props.editMode) {
      timer = setTimeout(() => {
        setInputState({
          summary: props.projectTask.summary,
          acceptanceCriteria: props.projectTask.acceptanceCriteria,
          dueDate: props.projectTask.dueDate,
          priority: props.projectTask.priority,
          status: props.projectTask.status
        });
      }, 200);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [props.projectTask, props.editMode]);

  const userInputHandler = (event) => {
    const { name, value } = event.target;
    setInputState((prevInputState) => {
      return {
        ...prevInputState,
        [name]: value
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (props.editMode) {
      const updatedProjectTask = {
        ...inputState,
        projectIdentifier: props.projectId,
        id: props.projectTask.id
      };
      props.onUpdateProjectTask(updatedProjectTask);
    } else {
      const newProjectTask = {
        ...inputState,
        projectIdentifier: props.projectId
      };

      props.onCreateProjectTask(newProjectTask);
    }

    if (!props.errors) {
      setInputState(initialInputState);
    }
  };

  return (
    <div className="col-md-8 m-auto">
      <Link to={`/project-board/${props.projectId}`}>
        <strong>Back to Project Board</strong>
      </Link>
      <h4 className="display-4 text-center my-4">
        {props.editMode ? "Update" : "Create"} Project Task
      </h4>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="summary" className="form-label">
            Summary
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": props.errors.summary
            })}
            name="summary"
            id="summary"
            placeholder="Project Task summary"
            value={inputState.summary}
            onChange={userInputHandler}
          />
          {props.errors.summary && (
            <div className="invalid-feedback">{props.errors.summary}</div>
          )}
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
            value={inputState.acceptanceCriteria}
            onChange={userInputHandler}
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
              value={inputState.dueDate}
              onChange={userInputHandler}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              className="form-control"
              name="priority"
              id="priority"
              value={inputState.priority}
              onChange={userInputHandler}
            >
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
            <select
              className="form-control"
              name="status"
              id="status"
              value={inputState.status}
              onChange={userInputHandler}
            >
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
              <Link to={`/project-board/${props.projectId}`} className="btn btn-secondary">
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