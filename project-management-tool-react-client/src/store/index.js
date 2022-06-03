import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./project-slice";

const store = configureStore({
  reducer: {
    project: projectReducer
  }
});

export default store;