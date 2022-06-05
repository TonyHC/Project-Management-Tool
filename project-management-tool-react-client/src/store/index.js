import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./project-slice";
import projectTaskReducer from "./project-task-slice";

const store = configureStore({
  reducer: {
    project: projectReducer,
    projectTask: projectTaskReducer
  }
});

export default store;