import React, { useState } from "react";

const initialInputState = {
  projectName: "",
  projectIdentifier: "",
  projectDescription: "",
  start_date: "",
  end_date: "",
};

const ProjectForm = () => {
  const [inputState, setInputState] = useState(initialInputState);

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
    setInputState({
      projectName: "",
      projectIdentifier: "",
      projectDescription: "",
      start_date: "",
      end_date: "",
    });
    console.log(inputState);
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
            className="form-control"
            placeholder="Project Name"
            name="projectName"
            id="projectName"
            value={inputState.projectName}
            onChange={userInputHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectIdentifier" className="form-label">
            Project ID
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Unique Project ID"
            name="projectIdentifier"
            id="projectIdentifier"
            value={inputState.projectIdentifier}
            onChange={userInputHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectDescription" className="form-label">
            Project Description
          </label>
          <textarea
            className="form-control"
            placeholder="Project Description"
            rows="3"
            name="projectDescription"
            id="projectDescription"
            value={inputState.projectDescription}
            onChange={userInputHandler}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="start_date" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            name="start_date"
            id="start_date"
            value={inputState.start_date}
            onChange={userInputHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="end_date" className="form-label">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            name="end_date"
            id="end_date"
            value={inputState.end_date}
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