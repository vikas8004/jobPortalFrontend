import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Box, Grid, GridItem, VStack } from '@chakra-ui/react'
import Job from './job'
import { useDispatch, useSelector } from 'react-redux'
import { setSerachQuery } from '../features/JobSlice.js'
import useGetAllJobs from '../hooks/useGetAllJobs.jsx'

const Browse = () => {
    const { allJobs } = useSelector(store => store.jobs);
    const { searchQuery } = useSelector(s => s.jobs);
    const [filjobs, setFilJobs] = useState([]);
    useGetAllJobs();
    useEffect(() => {
        const fjs = allJobs.filter(job => {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const titleMatch = job.title.toLowerCase().includes(lowerCaseQuery);
            const descriptionMatch = job.description.toLowerCase().includes(lowerCaseQuery);
            return titleMatch || descriptionMatch;
        });
        setFilJobs(fjs)

    }, [])
    return (
        <>
            <Navbar />
            <VStack px={["40px", "70px"]} alignItems={"start"} mt={"20px"} mb={5}>
                <Box as='h1' mb={5}>Search Results ({filjobs.length})</Box>
                <Grid gridTemplateColumns={["repeat(1,1fr)", "repeat(2,1fr)", "repeat(2,1fr)", "repeat(3,1fr)"]} gap={"20px"}>
                    {
                        filjobs.map((ele, i) => {
                            return <GridItem key={i}>
                                <Job ele={ele} />
                            </GridItem>
                        })
                    }
                </Grid>
            </VStack>
        </>
    )
}

export default Browse