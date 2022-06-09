import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_API = "http://localhost:8080/api/users";

export const createNewUser = createAsyncThunk(
  "security/createNewUser",
  async (data, { rejectWithValue }) => {
    const { newUser, history } = data;
    try {
      await axios.post(`${USERS_API}/register`, newUser);
      history.push("/login");
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
