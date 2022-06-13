import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PROJECT_TASKS_API = "http://localhost:8080/api/project-tasks";

export const createProjectTask = createAsyncThunk(
  "projectTasks/createProjectTask",
  async (data, { rejectWithValue }) => {
    try {
      const { projectId, projectTask, navigate } = data;
      await axios.post(`${PROJECT_TASKS_API}/${projectId}`, projectTask);
      navigate(`/project-board/${projectId}`, { replace: true });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProjectTasks = createAsyncThunk(
  "projectTasks/getAllProjectTasks",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${PROJECT_TASKS_API}/${projectId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProjectTask = createAsyncThunk(
  "projectTasks/getProjectTask",
  async (data, { rejectWithValue }) => {
    const { projectId, projectTaskSequence, navigate } = data;

    try {
      const res = await axios.get(`${PROJECT_TASKS_API}/${projectId}/${projectTaskSequence}`);
      return res.data;
    } catch (err) {
      navigate(`/project-board/${projectId}`);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProjectTask = createAsyncThunk(
  "projectTasks/updateProjectTask",
  async (data, { rejectWithValue }) => {
    try {
      const { projectId, projectTaskSequence, projectTask, navigate } = data;
      await axios.patch(`${PROJECT_TASKS_API}/${projectId}/${projectTaskSequence}`, projectTask);
      navigate(`/project-board/${projectId}`, { replace: true });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProjectTask = createAsyncThunk(
  "projectTasks/deleteProjectTask",
  async (data) => {
    if (window.confirm("Do you really want to delete this project task?")) {
      const { projectId, projectTaskSequence } = data;
      await axios.delete(`${PROJECT_TASKS_API}/${projectId}/${projectTaskSequence}`);
    } else {
      return "Cancel";
    }
  }
);