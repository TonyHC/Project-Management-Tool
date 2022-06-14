import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data, { rejectWithValue }) => {
    try {
      const { project, navigate } = data;
      await axios.post("/api/projects", project);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async () => {
    const res = await axios.get("/api/projects");
    return res.data;
  }
);

export const getProjectById = createAsyncThunk(
  "projects/getProjectById",
  async (data, { rejectWithValue }) => {
    const { projectId, navigate } = data;

    try {
      const res = await axios.get(`/api/projects/${projectId}`);
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
      await axios.delete(`/api/projects/${projectId}`);
    } else {
      return "Cancel";
    }
  }
);