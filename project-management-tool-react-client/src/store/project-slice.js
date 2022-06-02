import { createSlice } from "@reduxjs/toolkit";

import { createProject } from "./project-actions";

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
  },
});

export default projectSlice.reducer;