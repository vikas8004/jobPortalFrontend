import axios from 'axios'

import { useQuery } from 'react-query'
import { jobBaseUrl } from '../utils/constants.jsx';
import { useDispatch } from 'react-redux';
import { setAllAdminJobs } from '../features/JobSlice.js';
axios.defaults.withCredentials = true;
const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    const fetchAllAdminJobs = async () => {
        try {
            const res = await axios.get(`${jobBaseUrl}/adminjob`);
            return res.data;
        } catch (error) {
            throw new Error(error)
        }
    }
    useQuery("allAdminJobs", fetchAllAdminJobs, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            // console.log(data);
            dispatch(setAllAdminJobs(data.data.jobs))


        },
        onError: (err) => {
            console.log(err);

        }
    })
}

export default useGetAllAdminJobs