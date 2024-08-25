import { configureStore } from "@reduxjs/toolkit";
import authFeatures from "../features/authFeatures.js";
import JobSlice from "../features/JobSlice.js";
import companySlice from "../features/companySlice.js";
import applicationSlice from "../features/applicationSlice.js";
const store = configureStore({
    reducer: {
        auth: authFeatures,
        jobs: JobSlice,
        company: companySlice,
        application: applicationSlice
    }
})

export default store;
