import { createSlice } from "@reduxjs/toolkit";

const projectTaskSlice = createSlice({
    name: "projectTask",
    initialState: {
        projectTasks: [],
        projectTask: {},
        errors: {},
        status: null
    },
    reducers: {},
    extraReducers: {

    }
});

export default projectTaskSlice.reducer;