import React from 'react'
import Navbar from '../Navbar'
import { Stack, Text } from '@chakra-ui/react'
import ApplicantTable from './ApplicantTable'
import Loader from '../Spinner'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { applicationBaseUrl } from '../../utils/constants.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '../../features/applicationSlice.js'
axios.defaults.withCredentials = true;
const Applicants = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    const fetchApplicants = async () => {
        try {
            const res = await axios.get(`${applicationBaseUrl}/getapplicants/${jobId}/`);
            return res.data;
        } catch (error) {
            throw new Error(error)
        }
    }
    const {  isLoading, isError } = useQuery("applicants", fetchApplicants, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            // console.log(data);
            dispatch(setApplicants(data.data.job.applications));

        },
        onError: (err) => {
            console.log(err);

        }
    })

    return (
        <>
            {isLoading && <Loader />}
            {isError && <Text>Something went wrong</Text>}
            {
                !applicants.length ? <> <Navbar /><Stack px={["10px", "70px"]} mt="20px"> <Text fontWeight={"bold"} fontSize={"sm"}>Applicants ({applicants.length})</Text></Stack></> : <><Navbar />
                    <Stack px={["10px", "70px"]} mt="20px">
                        <Text fontWeight={"bold"} fontSize={"sm"}>Applicants ({applicants.length})</Text>
                        <ApplicantTable />
                    </Stack></>
            }
        </>
    )
}

export default Applicants