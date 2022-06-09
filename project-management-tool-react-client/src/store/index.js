import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./project-slice";
import projectTaskReducer from "./project-task-slice";
import securityReducer from "./security-slice";

const store = configureStore({
  reducer: {
    project: projectReducer,
    projectTask: projectTaskReducer,
    security: securityReducer
  }
});

export default store;