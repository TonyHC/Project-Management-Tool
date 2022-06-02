import { createSlice } from "@reduxjs/toolkit";

import { createProject, getProjects, getProjectById } from "./project-actions";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    project: {},
    status: null,
    errors: {}
  },
  reducers: {},
  extraReducers: {
    [createProject.pending]: (state, action) => {
      state.status = "loading";
    },
    [createProject.fulfilled]: (state, action) => {
      state.status = "success";
      state.errors = {};
    },
    [createProject.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [getProjects.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProjects.fulfilled]: (state, action) => {
      state.status = "success";
      state.errors = {};
      state.projects = action.payload;
    },
    [getProjects.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.error;
    },
    [getProjectById.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProjectById.fulfilled]: (state, action) => {
      state.status = "success";
      state.errors = {};
      state.project = action.payload;
    },
    [getProjectById.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.error;
    },
  },
});

export default projectSlice.reducer;