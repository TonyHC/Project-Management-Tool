import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PROJECTS_API = "http://localhost:8080/api/projects";

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (data, { rejectWithValue }) => {
    try {
      const { project, history } = data;
      await axios.post(PROJECTS_API, project);
      history.push("/dashboard");
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
