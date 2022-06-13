import React, { useState, useEffect } from "react";
import classNames from "classnames";

const initialInputState = {
  projectName: "",
  projectIdentifier: "",
  projectDescription: "",
  startDate: "",
  endDate: ""
};

const ProjectForm = (props) => {
  const [inputState, setInputState] = useState(initialInputState);

  useEffect(() => {
    let timer;

    if (Object.keys(props.project).length > 0 && props.editMode) {
      timer = setTimeout(() => {
        setInputState({
          projectName: props.project.projectName,
          projectIdentifier: props.project.projectIdentifier,
          projectDescription: props.project.projectDescription,
          startDate: props.project.startDate,
          endDate: props.project.endDate
        });
      }, 200);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [props.project, props.editMode]);

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
      const updatedProject = {
        id: props.project.id,
        ...inputState
      };
      props.onCreateProject(updatedProject);
    } else {
      props.onCreateProject(inputState);
    }

    if (!props.errors) {
      setInputState(initialInputState);
    }
  };

  return (
    <section className="col-md-8 m-auto">
      <h6 className="display-6 text-center">
        {props.editMode ? "Edit" : "Create"} Project Form
      </h6>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">
            Project Name
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": props.errors.projectName
            })}
            placeholder="Project Name"
            name="projectName"
            id="projectName"
            value={inputState.projectName}
            onChange={userInputHandler}
          />
          {props.errors.projectName && (
            <div className="invalid-feedback">{props.errors.projectName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="projectIdentifier" className="form-label">
            Project ID
          </label>
          <input
            type="text"
            className={classNames("form-control", {
              "is-invalid": props.errors.projectIdentifier
            })}
            placeholder="Unique Project ID"
            name="projectIdentifier"
            id="projectIdentifier"
            value={inputState.projectIdentifier}
            onChange={userInputHandler}
            disabled={props.editMode}
          />
          {props.errors.projectIdentifier && (
            <div className="invalid-feedback">{props.errors.projectIdentifier}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="projectDescription" className="form-label">
            Project Description
          </label>
          <textarea
            className={classNames("form-control", {
              "is-invalid": props.errors.projectDescription
            })}
            placeholder="Project Description"
            rows="3"
            name="projectDescription"
            id="projectDescription"
            value={inputState.projectDescription}
            onChange={userInputHandler}
          ></textarea>
          {props.errors.projectDescription && (
            <div className="invalid-feedback">{props.errors.projectDescription}</div>
          )}
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
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
          <div className="col-md-6">
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