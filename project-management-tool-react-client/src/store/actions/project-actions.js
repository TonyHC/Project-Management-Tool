import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PROJECTS_API = "http://localhost:8080/api/projects";

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data, { rejectWithValue }) => {
    try {
      const { project, navigate } = data;
      await axios.post(PROJECTS_API, project);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async () => {
    const res = await axios.get(PROJECTS_API);
    return res.data;
  }
);

export const getProjectById = createAsyncThunk(
  "projects/getProjectById",
  async (data, { rejectWithValue }) => {
    const { projectId, navigate } = data;

    try {
      const res = await axios.get(`${PROJECTS_API}/${projectId}`);
      return res.data;
    } catch (err) {
      navigate("/dashboard");
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProjectById = createAsyncThunk(
  "projects/deleteProjectById",
  async (projectId) => {
    if (window.confirm("Do you really want to delete this project?")) {
      await axios.delete(`${PROJECTS_API}/${projectId}`);
    } else {
      return "Cancel";
    }
  }
);