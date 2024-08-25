import React from 'react'
import { setAllCompanies } from '../features/companySlice.js'
import { useDispatch } from 'react-redux'
import { useQuery } from 'react-query'
import axios from 'axios';
import { companyBaseUrl } from '../utils/constants.jsx';
axios.defaults.withCredentials = true;

const useGetAllCompanies = () => {
    const dispatch=useDispatch();
    const fetchCompanies = async () => {
        try {
            const res = await axios.get(`${companyBaseUrl}/companies`);
            return res.data;
        } catch (error) {
            throw new Error(error)
        }
    }
    useQuery("allCompanies", fetchCompanies, {
        onSuccess: (data) => {
            // console.log(data);
            dispatch(setAllCompanies(data.data))

        },
        onError: (err) => {
            console.log(err);

        },
        refetchOnWindowFocus:false
    })
}

export default useGetAllCompanies