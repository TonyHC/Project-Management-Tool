import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { createNewUser, login } from "./security-actions";

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
        builder.addCase(createNewUser.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(createNewUser.fulfilled, (state, action) => {
            state.status = "success";
            state.errors = {};
        })
        .addCase(createNewUser.rejected, (state, action) => {
            state.status = "failed";
            state.errors = action.payload;
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
            state.errors = action.payload;
        })
        .addCase(PURGE, () => initialState);
    }
});

export default securitySlice.reducer;