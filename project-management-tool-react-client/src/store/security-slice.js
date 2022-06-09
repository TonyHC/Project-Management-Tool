import { createSlice } from "@reduxjs/toolkit";

import { createNewUser, login } from "./security-actions";

const securitySlice = createSlice({
    name: "security",
    initialState: {
        user: {},
        isAuth: false,
        errors: {},
        status: null
    },
    reducers: {
        
    },
    extraReducers: {
        [createNewUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [createNewUser.fulfilled]: (state, action) => {
            state.status = "success";
            state.errors = {};
        },
        [createNewUser.rejected]: (state, action) => {
            state.status = "failed";
            state.errors = action.payload;
        },
        [login.pending]: (state, action) => {
            state.status = "loading";
        },
        [login.fulfilled]: (state, action) => {
            state.status = "success";
            state.user = action.payload;
            state.isAuth = true;
            state.errors = {};
        },
        [login.rejected]: (state, action) => {
            state.status = "failed";
            state.errors = action.payload;
        }
    }
});

export default securitySlice.reducer;