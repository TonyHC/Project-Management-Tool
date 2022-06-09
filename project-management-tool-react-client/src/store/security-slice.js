import { createSlice } from "@reduxjs/toolkit";


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

    }
});

export default securitySlice.reducer;