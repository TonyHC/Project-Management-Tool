import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { setJWTToken } from "../../utils/setJWTToken";
import persistor from "../../index";

const USERS_API = "http://localhost:8080/api/users";

export const register = createAsyncThunk(
  "security/register",
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
  "security/login",
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

export const logout = createAsyncThunk(
  "security/logout",
  async (history) => {
    persistor.purge();
    localStorage.removeItem("jwt");
    setJWTToken(false);
    history.replace("/login");
  }
);

export const getUserById = createAsyncThunk(
  "security/getUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${USERS_API}/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);