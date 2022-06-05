import { createSlice } from "@reduxjs/toolkit";

import { createProjectTask, getProjectTasks } from "./project-task-actions";

const projectTaskSlice = createSlice({
  name: "projectTask",
  initialState: {
    projectTasks: [],
    projectTask: {},
    errors: {},
    status: null
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
  },
});

export default projectTaskSlice.reducer;