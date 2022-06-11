import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import {
  createProjectTask,
  getProjectTasks,
  getProjectTask,
  updateProjectTask,
  deleteProjectTask
} from "../actions/project-task-actions";

const initialState = {
  projectTasks: [],
  projectTask: {},
  errors: {},
  status: null
};

const projectTaskSlice = createSlice({
  name: "projectTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProjectTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createProjectTask.fulfilled, (state, action) => {
        state.status = "success";
        state.errors = {};
      })
      .addCase(createProjectTask.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.payload;
      })
      .addCase(getProjectTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProjectTasks.fulfilled, (state, action) => {
        state.status = "success";
        state.errors = {};
        state.projectTasks = action.payload;
      })
      .addCase(getProjectTasks.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.payload;
      })
      .addCase(getProjectTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProjectTask.fulfilled, (state, action) => {
        state.status = "success";
        state.projectTask = action.payload;
        state.errors = {};
      })
      .addCase(getProjectTask.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.payload;
      })
      .addCase(updateProjectTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateProjectTask.fulfilled, (state, action) => {
        state.status = "success";
        state.errors = {};
      })
      .addCase(updateProjectTask.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.payload;
      })
      .addCase(deleteProjectTask.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteProjectTask.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== "Cancel") {
          state.projectTasks = state.projectTasks.filter(
            (projectTask) =>
              projectTask.projectSequence !==
              action.meta.arg.projectTaskSequence
          );
        }
        state.errors = {};
      })
      .addCase(deleteProjectTask.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.error;
      })
      .addCase(PURGE, () => initialState);
  },
});

export default projectTaskSlice.reducer;