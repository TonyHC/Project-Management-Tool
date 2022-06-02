import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

import { createProject } from "../../store/project-actions";

const initialInputState = {
  projectName: "",
  projectIdentifier: "",
  projectDescription: "",
  startDate: "",
  endDate: "",
};

const ProjectForm = () => {
  const [inputState, setInputState] = useState(initialInputState);

  const dispatch = useDispatch();
  const history = useHistory();
  const { errors } = useSelector((state) => state.project);

  const userInputHandler = (event) => {
    const { name, value } = event.target;

    setInputState((prevInputState) => {
      return {
        ...prevInputState,
        [name]: value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!errors) {
      setInputState({
        projectName: "",
        projectIdentifier: "",
        projectDescription: "",
        startDate: "",
        endDate: "",
      });
    }

    console.log(inputState);
    dispatch(createProject({ project: inputState, history: history }));
  };

  return (
    <section className="col-md-8 m-auto">
      <h6 className="display-6 text-center">Create / Edit Project Form</h6>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": errors.projectName,
            })}
            placeholder="Project Name"
            name="projectName"
            id="projectName"
            value={inputState.projectName}
            onChange={userInputHandler}
          />
          {errors.projectName && (
            <div className="invalid-feedback">{errors.projectName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="projectIdentifier" className="form-label">
            Project ID
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": errors.projectIdentifier,
            })}
            placeholder="Unique Project ID"
            name="projectIdentifier"
            id="projectIdentifier"
            value={inputState.projectIdentifier}
            onChange={userInputHandler}
          />
          {errors.projectIdentifier && (
            <div className="invalid-feedback">{errors.projectIdentifier}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="projectDescription" className="form-label">
            Project Description
          </label>
          <textarea
            className={classNames("form-control", {
              "is-invalid": errors.projectDescription,
            })}
            placeholder="Project Description"
            rows="3"
            name="projectDescription"
            id="projectDescription"
            value={inputState.projectDescription}
            onChange={userInputHandler}
          ></textarea>
          {errors.projectDescription && (
            <div className="invalid-feedback">{errors.projectDescription}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            name="startDate"
            id="startDate"
            value={inputState.startDate}
            onChange={userInputHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            name="endDate"
            id="endDate"
            value={inputState.endDate}
            onChange={userInputHandler}
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary btn-block mt-2">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProjectForm;