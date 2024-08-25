import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        allCompanies: [],
        searchInputText: ""
    },
    reducers: {
        setSingleCompnay: (state, action) => {
            state.singleCompany = action.payload;
        },
        setAllCompanies: (state, action) => {
            state.allCompanies = action.payload;
        },
        setSearchInputText: (state, action) => {


            state.searchInputText = action.payload;
        }
    }
})

export const { setSingleCompnay, setAllCompanies, setSearchInputText } = companySlice.actions;
export default companySlice.reducer;