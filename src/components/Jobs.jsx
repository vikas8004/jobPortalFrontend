import { Box, Grid, GridItem, HStack, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'
import Job from './job'
import FilterCard from './FilterCard'
let arr = [1, 2, 3, 4, 5, 6]
import { useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs.jsx'

const Jobs = () => {
    useGetAllJobs()
    const { allJobs: arr } = useSelector((store) => store.jobs)
    return (
        <>
            <Navbar />
            <Stack px={["10px", "40px", "70px"]} flexDir={"row"} justifyContent={"space-between"} mt={"40px"} mb={"20px"}>
                {/* filter cards*/}
                <Box width={"15%"}>
                    <FilterCard />
                </Box>
                {/* all job cards */}
                {
                    !arr.length ? <Text>No jobs found</Text> :
                        <Box maxW={"85%"} >
                            <Grid gridTemplateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(2,1fr)", "repeat(3,1fr)"]} gap={"20px"}

                            >
                                {arr.map((ele, i) => {
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