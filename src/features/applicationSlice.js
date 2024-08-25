import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "Application",
    initialState: {
        applicants: []
    },
    reducers: {
        setApplicants: (state, action) => {
            state.applicants = action.payload;
        }
    }
})

export const { setApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;