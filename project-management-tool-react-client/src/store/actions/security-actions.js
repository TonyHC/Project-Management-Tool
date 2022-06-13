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
      const { newUser, navigate } = data;
      await axios.post(`${USERS_API}/register`, newUser);
      navigate("/login", { replace: true });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "security/login",
  async (data, { rejectWithValue }) => {
    try {
      const { loginRequest, navigate } = data;
      const res = await axios.post(`${USERS_API}/login`, loginRequest);

      console.log("IN DA");

      const { token } = res.data;
      localStorage.setItem("jwt", token);
      setJWTToken(token);
      navigate("/dashboard", { replace: true });

      return jwt_decode(token);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "security/logout",
  async (navigate) => {
    persistor.purge();
    localStorage.removeItem("jwt");
    setJWTToken(false);
    navigate("/login", { replace: true });
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

export const resetPassword = createAsyncThunk(
  "security/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const { updatedUser, navigate } = data;
      await axios.patch(`${USERS_API}/reset-password`, updatedUser);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);