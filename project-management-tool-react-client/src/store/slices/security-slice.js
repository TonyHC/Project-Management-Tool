import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { register, login, getUserById } from "../actions/security-actions";

const initialState = {
    user: {},
    isAuth: false,
    errors: {},
    status: null
}

const securitySlice = createSlice({
    name: "security",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(register.fulfilled, (state, action) => {
            state.status = "success";
            state.errors = {};
        })
        .addCase(register.rejected, (state, action) => {
            state.status = "failed";
            state.errors = { ...action.payload, type: action.type.split("/")[1]};
        })
        .addCase(login.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(login.fulfilled, (state, action) => {
            state.status = "success";
            state.user = action.payload;
            state.isAuth = true;
            state.errors = {};
        })
        .addCase(login.rejected, (state, action) => {
            state.status = "failed";
            state.errors = { ...action.payload, type: action.type.split("/")[1]};
        })
        .addCase(getUserById.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(getUserById.fulfilled, (state, action) => {
            state.status = "success";
            state.user = action.payload;
            state.errors = {};
        })
        .addCase(getUserById.rejected, (state, action) => {
            state.status = "failed";
            state.errors = action.payload;
        })
        .addCase(PURGE, () => initialState);
    }
});

export default securitySlice.reducer;