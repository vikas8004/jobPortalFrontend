import React from 'react'
import Navbar from './Navbar'
import { Box, Grid, GridItem, VStack } from '@chakra-ui/react'
import Job from './job'
const searchResult = [1, 2, 3]
const Browse = () => {
    return (
        <>
            <Navbar />
            <VStack px={["40px", "70px"]} alignItems={"start"} mt={"20px"}mb={5}>
                <Box as='h1' mb={5}>Search Results ({searchResult.length})</Box>
                <Grid gridTemplateColumns={["repeat(1,1fr)","repeat(2,1fr)","repeat(2,1fr)","repeat(3,1fr)"]} gap={"20px"}>
                    {
                        searchResult.map((ele, i) => {
                            return <GridItem key={i}>
                                <Job />
                            </GridItem>
                        })
                    }
                </Grid>
            </VStack>
        </>
    )
}

export default Browse