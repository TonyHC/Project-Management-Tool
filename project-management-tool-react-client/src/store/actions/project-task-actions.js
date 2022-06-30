import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProjectTask = createAsyncThunk(
  "projectTasks/createProjectTask",
  async (data, { rejectWithValue }) => {
    try {
      const { projectId, projectTask, navigate } = data;
      await axios.post(`/api/project-tasks/${projectId}`, projectTask);
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
      const res = await axios.get(`/api/project-tasks/${projectId}`);
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
      const res = await axios.get(`/api/project-tasks/${projectId}/${projectTaskSequence}`);
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
      await axios.patch(`/api/project-tasks/${projectId}/${projectTaskSequence}`, projectTask);
      navigate(`/project-board/${projectId}`, { replace: true });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProjectTasksOrder = createAsyncThunk(
  "projectTasks/updateProjectTasksOrder",
  async (data, { rejectWithValue }) => {
    try {
      const { projectId, projectTasks } = data;
      await axios.patch(`/api/project-tasks/${projectId}`, projectTasks);
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
      await axios.delete(`/api/project-tasks/${projectId}/${projectTaskSequence}`);
    } else {
      return "Cancel";
    }
  }
);