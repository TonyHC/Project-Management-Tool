import { createSlice } from "@reduxjs/toolkit";

import {
  createProjectTask,
  getProjectTasks,
  getProjectTask,
  updateProjectTask,
  deleteProjectTask,
} from "./project-task-actions";

const projectTaskSlice = createSlice({
  name: "projectTask",
  initialState: {
    projectTasks: [],
    projectTask: {},
    errors: {},
    status: null,
  },
  reducers: {},
  extraReducers: {
    [createProjectTask.pending]: (state, action) => {
      state.status = "loading";
    },
    [createProjectTask.fulfilled]: (state, action) => {
      state.status = "success";
      state.errors = {};
    },
    [createProjectTask.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [getProjectTasks.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProjectTasks.fulfilled]: (state, action) => {
      state.status = "success";
      state.errors = {};
      state.projectTasks = action.payload;
    },
    [getProjectTasks.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [getProjectTask.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProjectTask.fulfilled]: (state, action) => {
      state.status = "success";
      state.projectTask = action.payload;
      state.errors = {};
    },
    [getProjectTask.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [updateProjectTask.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateProjectTask.fulfilled]: (state, action) => {
      state.status = "success";
      state.errors = {};
    },
    [updateProjectTask.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [deleteProjectTask.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteProjectTask.fulfilled]: (state, action) => {
      state.status = "success";
      if (action.payload !== "Cancel") {
        console.log(action);
        state.projectTasks = state.projectTasks.filter(
          (projectTask) =>
            projectTask.projectSequence !== action.meta.arg.projectTaskSequence
        );
      }
      state.errors = {};
    },
    [deleteProjectTask.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.error;
    },
  },
});

export default projectTaskSlice.reducer;