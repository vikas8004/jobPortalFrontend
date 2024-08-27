import { Box, Grid, GridItem, HStack, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Job from './job'
import FilterCard from './FilterCard';
import { useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs.jsx'

const Jobs = () => {
    useGetAllJobs();
    const { allJobs: arr } = useSelector((store) => store.jobs);
    const [filJobs, setFilJobs] = useState(arr);
    const applyFilter = (selectedFilter) => {

        
        const filtered = arr.filter(job => {
            if(!selectedFilter){
                return true;
            }
            return (
                job.title.toLowerCase() === selectedFilter.toLowerCase() ||
                job.location.toLowerCase() === selectedFilter.toLowerCase() ||
                job.salary.toLowerCase() === selectedFilter.toLowerCase()
            );
        });
        console.log(filtered);
        
        setFilJobs(filtered);
    };
    useEffect(() => {
        setFilJobs(arr);     
    }, [arr])


    return (
        <>
            <Navbar />
            <Stack px={["10px", "40px", "70px"]} flexDir={"row"} justifyContent={"space-between"} mt={"40px"} mb={"20px"}>
                {/* filter cards*/}
                <Box width={"15%"}>
                    <FilterCard applyFilter={applyFilter} />
                </Box>
                {/* all job cards */}
                {
                    !filJobs.length ? <Text>No jobs found</Text> :
                        <Box maxW={"85%"} >
                            <Grid gridTemplateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(2,1fr)", "repeat(3,1fr)"]} gap={"20px"}

                            >
                                {filJobs.map((ele, i) => {
                                    return <GridItem key={i}><Job ele={ele} /></GridItem>
                                })}
                            </Grid>
                        </Box>
                }
            </Stack>
        </>
    )
}

export default Jobs