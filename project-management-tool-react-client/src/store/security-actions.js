import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { setJWTToken } from "../utils/setJWTToken";

const USERS_API = "http://localhost:8080/api/users";

export const createNewUser = createAsyncThunk(
  "security/createNewUser",
  async (data, { rejectWithValue }) => {
    try {
      const { newUser, history } = data;
      await axios.post(`${USERS_API}/register`, newUser);
      history.push("/login");
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "security/authenticateUser",
  async (data, { rejectWithValue }) => {
    try {
      const { loginRequest, history } = data;
      const res = await axios.post(`${USERS_API}/login`, loginRequest);

      const { token } = res.data;
      localStorage.setItem("jwt", token);
      setJWTToken(token);
      history.push("/dashboard");

      return jwt_decode(token);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);