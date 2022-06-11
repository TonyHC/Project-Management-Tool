import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import {
  createProject,
  getProjects,
  getProjectById,
  deleteProjectById,
} from "./project-actions";

const initialState = {
  projects: [],
  project: {},
  status: null,
  errors: {},
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "success";
        state.errors = {};
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.payload;
      })
      .addCase(getProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.status = "success";
        state.errors = {};
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.error;
      })
      .addCase(getProjectById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.status = "success";
        state.errors = {};
        state.project = action.payload;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.error;
      })
      .addCase(deleteProjectById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteProjectById.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== "Cancel") {
          state.projects = state.projects.filter(
            (project) => project.projectIdentifier !== action.meta.arg
          );
        }
        state.errors = {};
      })
      .addCase(deleteProjectById.rejected, (state, action) => {
        state.status = "failed";
        state.errors = action.error;
      })
      .addCase(PURGE, () => initialState);
  },
});

export default projectSlice.reducer;