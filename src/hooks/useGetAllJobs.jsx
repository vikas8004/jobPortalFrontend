
import { jobBaseUrl } from '../utils/constants.jsx';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setAllJobs } from '../features/JobSlice.js';
const useGetAllJobs = () => {
    const dispatch = useDispatch();
    useQuery('allJobs', async () => {
        try {
            const res = await axios.get(`${jobBaseUrl}/alljobs`);
            return res.data
        } catch (error) {
            throw new Error(error)
        }
    }, {

        onSuccess: (data) => {
            // console.log(data);
            dispatch(setAllJobs(data.data.jobs))

        },
        onError: (err) => {
            console.log(err);

        }
        ,
        refetchOnWindowFocus: false
    })
}

export default useGetAllJobs