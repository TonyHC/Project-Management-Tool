import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { register, login, getUserById, resetPassword } from "../actions/security-actions";
import { splitActionType } from "../../utils/splitActionType";

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
            state.errors = { ...action.payload, type: splitActionType(action.type, "/")};
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
            state.errors = { ...action.payload, type: splitActionType(action.type, "/")};
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
        .addCase(resetPassword.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.status = "success";
            state.errors = {};
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.status = "failed";
            state.errors = action.payload;
        })
        .addCase(PURGE, () => initialState);
    }
});

export default securitySlice.reducer;