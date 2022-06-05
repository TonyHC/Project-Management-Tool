import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PROJECT_TASKS_API = "http://localhost:8080/api/project-tasks";

export const createProjectTask = createAsyncThunk(
  "projectTasks/createProjectTask",
  async (data, { rejectWithValue }) => {
    const { projectId, projectTask, history } = data;
    await axios.post(`${PROJECT_TASKS_API}/${projectId}`, projectTask);
    history.push(`/project-board/${projectId}`);
  }
);