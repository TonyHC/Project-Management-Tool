import { createSlice } from "@reduxjs/toolkit";

import { createNewUser } from "./security-actions";

const securitySlice = createSlice({
    name: "security",
    initialState: {
        user: {},
        isAuth: false,
        errors: {},
        status: null
    },
    reducers: {},
    extraReducers: {
        [createNewUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [createNewUser.fulfilled]: (state, action) => {
            state.status = "loading";
            state.errors = {};
        },
        [createNewUser.rejected]: (state, action) => {
            state.status = "failed";
            console.log(action);
            state.errors = action.payload;
        }
    }
});

export default securitySlice.reducer;