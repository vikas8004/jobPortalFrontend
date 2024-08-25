import { Box, Grid, HStack, Text, VStack, GridItem } from '@chakra-ui/react'
import React from 'react'
import LatestJobCards from './LatestJobCards.jsx'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
    
    const { allJobs: arr } = useSelector(store => store.jobs)
    // console.log(arr);
    

    return (
        <VStack px={["40px", "70px"]} mt={"30px"}>
            <Text width={"full"} textAlign={["center", "center"]} fontSize={"2xl"} marginBottom={"20px"} fontWeight={"bold"}><Box as='span' color={"#6a38c2"}>Latest and Top</Box> Job Openings</Text>
            <Grid templateColumns={["repeat(1,1fr)", "repeat(2,1fr)", "repeat(2,1fr)", "repeat(3,1fr)"]} gap={"15px"} justifyContent={"space-between"}>
                {
                    arr.map((ele, i) => { return <GridItem key={i}><LatestJobCards ele={ele} /></GridItem> })
                }
            </Grid>
        </VStack>
    )
}

export default LatestJobs