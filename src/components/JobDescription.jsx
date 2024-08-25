import { Badge, Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { applicationBaseUrl, jobBaseUrl } from '../utils/constants.jsx';
import { setSingleJob } from '../features/JobSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import firstLetterCapital from '../utils/makeFirstLetterCapital.jsx'

axios.defaults.withCredentials = true;
const JobDescription = () => {
    const { user } = useSelector((store) => store.auth);
    const { singleJob } = useSelector((store) => store.jobs);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const isApplied = singleJob?.applications?.some(applicant => applicant.applicant === user?._id);;


    const { refetch: singleJobRefetch } = useQuery('singleJob', async () => {
        try {
            const res = await axios.get(`${jobBaseUrl}/jobbyid/${jobId}`)
            return res.data;
        } catch (error) {
            throw new Error(error)
        }
    },

        {

            onSuccess: (data) => {
                // console.log(data);
                dispatch(setSingleJob(data.data.job))

            },
            onError: (err) => {
                console.log(err);

            }
        });


    // using useQuery
    const applyJobHandler = async () => {
        try {
            if (!user) {
                navigate("/login")
            }
            const res = await axios.get(`${applicationBaseUrl}/applyjob/${jobId}`);
            return res.data;
        } catch (error) {
            console.log(error);

            throw new Error(error)
        }
    }
    const { refetch: applyJobRefetch, isLoading: applyJobLoading } = useQuery("applyJob", applyJobHandler, {
        enabled: false,
        onSuccess: (data) => {
            // console.log(data);
            singleJobRefetch();

        },
        onError: (err) => {
            console.log(err);

        }
    })

    return (
        <>
            <VStack width={"70%"} mx={"auto"} alignItems={"flex-start"} mt={"20px"}>
                <HStack justifyContent={"space-between"} width={"full"}>
                    <VStack justifyContent={"flex-start"}>
                        <Text fontWeight={"bold"} textAlign={"left"} width={"full"}>{singleJob?.title && firstLetterCapital(singleJob?.title)}</Text>
                        <HStack gap={"20px"} mt={"10px"}>
                            <Badge fontWeight={"bold"} fontSize={"10px"} colorScheme='blue'>{singleJob?.position} positions</Badge>
                            <Badge fontWeight={"bold"} fontSize={"10px"} colorScheme='red'>{singleJob?.jobType && firstLetterCapital(singleJob?.jobType)}</Badge>
                            <Badge fontWeight={"bold"} fontSize={"10px"} colorScheme='purple'>{singleJob?.salary}</Badge>
                        </HStack>
                    </VStack>
                    <VStack>
                        <Button bg={isApplied ? "black" : "purple"} color={"white"} _hover={{ bg: `${isApplied ? "black" : "black"}` }} isDisabled={isApplied} fontWeight={"normal"}
                            isLoading={applyJobLoading}
                            loadingText={"Applying..."}
                            onClick={() => applyJobRefetch()}
                        >{isApplied ? "Applied" : "Apply Now"}</Button>
                    </VStack>
                </HStack>
                <Box width={"full"} mt={"20px"}>
                    <Text>Job Description</Text>
                    <Divider borderBottom={"1px solid black"} my={"10px"} />
                </Box>
                <Box>
                    <Text fontWeight={"bold"}>Location : <Box as="span" fontWeight={"normal"}>{singleJob?.location && firstLetterCapital(singleJob?.location)}</Box></Text>
                    <Text fontWeight={"bold"}>Description : <Box as="span" fontWeight={"normal"}>{singleJob?.description && firstLetterCapital(singleJob?.description)}</Box></Text>
                    <Text fontWeight={"bold"}>Experience : <Box as="span" fontWeight={"normal"}>{singleJob?.experience}</Box></Text>
                    <Text fontWeight={"bold"}>Salary : <Box as="span" fontWeight={"normal"}>{singleJob?.salary}</Box></Text>
                    <Text fontWeight={"bold"}>Total Applicants : <Box as="span" fontWeight={"normal"}>{singleJob?.applications?.length}</Box></Text>
                    <Text fontWeight={"bold"}>Post Date : <Box as="span" fontWeight={"normal"}>{new Date(singleJob?.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}</Box></Text>
                </Box>
            </VStack>
        </>
    )
}

export default JobDescription