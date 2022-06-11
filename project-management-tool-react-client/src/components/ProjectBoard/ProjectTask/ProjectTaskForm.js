import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { createProjectTask, getProjectTask, updateProjectTask} from "../../../store/actions/project-task-actions";

const initialInputState = {
  summary: "",
  acceptanceCriteria: "",
  dueDate: "",
  priority: 0,
  status: ""
};

const ProjectTaskForm = () => {
  const [inputState, setInputState] = useState(initialInputState);
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { projectId, projectTaskSequence } = params;
  const { errors, projectTask } = useSelector((state) => state.projectTask);

  useEffect(() => {
    if (projectId && projectTaskSequence) {
      dispatch(getProjectTask({ projectId, projectTaskSequence, history }));
      setEditMode(true);
    }
  }, [dispatch, projectId, projectTaskSequence, history]);

  useEffect(() => {
    let timer;

    if (Object.keys(projectTask).length > 0 && editMode) {
      timer = setTimeout(() => {
        setInputState({
          summary: projectTask.summary,
          acceptanceCriteria: projectTask.acceptanceCriteria,
          dueDate: projectTask.dueDate,
          priority: projectTask.priority,
          status: projectTask.status
        });
      }, 200);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [projectTask, editMode]);

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

    if (!errors) {
      setInputState(initialInputState);
      setEditMode(false);
    }

    if (editMode) {
      const updatedProjectTask = {
        ...inputState,
        projectIdentifier: projectId,
        id: projectTask.id
      };
      dispatch(
        updateProjectTask({
          projectId,
          projectTaskSequence,
          projectTask: updatedProjectTask,
          history
        })
      );
    } else {
      const newProjectTask = {
        ...inputState,
        projectIdentifier: projectId
      };

      dispatch(
        createProjectTask({
          projectId,
          projectTask: newProjectTask,
          history
        })
      );
    }
  };

  return (
    <div className="col-md-8 m-auto">
      <Link to={`/project-board/${projectId}`}>
        <strong>Back to Project Board</strong>
      </Link>
      <h4 className="display-4 text-center my-4">
        {editMode ? "Update" : "Create"} Project Task
      </h4>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="summary" className="form-label">
            Summary
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": errors.summary
            })}
            name="summary"
            id="summary"
            placeholder="Project Task summary"
            value={inputState.summary}
            onChange={userInputHandler}
          />
          {errors.summary && (
            <div className="invalid-feedback">{errors.summary}</div>
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
              <Link to={`/project-board/${projectId}`} className="btn btn-secondary">
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