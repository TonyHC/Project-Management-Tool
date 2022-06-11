import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import projectReducer from "./slices/project-slice";
import projectTaskReducer from "./slices/project-task-slice";
import securityReducer from "./slices/security-slice";

const reducers = combineReducers({
  project: projectReducer,
  projectTask: projectTaskReducer,
  security: securityReducer,
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/PURGE"]
      }
    })
});

export default store;