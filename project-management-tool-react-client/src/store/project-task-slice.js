import { createSlice } from "@reduxjs/toolkit";

import { createProjectTask } from "./project-task-actions";

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
    },
    [createProjectTask.rejected]: (state, action) => {
        state.status = "failed";
    },
  },
});

export default projectTaskSlice.reducer;