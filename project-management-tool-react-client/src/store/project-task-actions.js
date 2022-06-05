import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PROJECT_TASKS_API = "http://localhost:8080/api/project-tasks";

export const createProjectTask = createAsyncThunk(
  "projectTasks/createProjectTask",
  async (data, { rejectWithValue }) => {
    try {
      const { projectId, projectTask, history } = data;
      await axios.post(`${PROJECT_TASKS_API}/${projectId}`, projectTask);
      history.push(`/project-board/${projectId}`);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProjectTasks = createAsyncThunk(
  "projectTasks,getAllProjectTasks",
  async (projectId) => {
    const res = await axios.get(`${PROJECT_TASKS_API}/${projectId}`);
    return res.data;
  }
);