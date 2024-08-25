import { Box, Button, HStack, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import JobTables from './JobTables.jsx'
import { setSearchJobByText } from '../../features/JobSlice.js'
import { useDispatch } from 'react-redux'

const AdminJobs = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input])
    return (
        <>
            <Navbar />
            <VStack px={["10px", "70px"]} alignItems={"flex-start"} mt={"20px"} width={"full"}>
                <HStack justifyContent={"space-between"} width={"full"}>
                    <Input placeholder='filter jobs' width={"20%"} borderColor={'black'} focusBorderColor='black' onChange={(e) => setInput(e.target.value)} value={input} />
                    <Box>
                        <Button size={"sm"} bgColor={"black"} color={'white'} _hover={{ color: "white", bg: "black" }}
                            px={"4px"} fontWeight={"bold"} onClick={() => navigate("/admin/jobs/create")}>New Job</Button>
                    </Box>
                </HStack>
                <JobTables />
            </VStack>
        </>

    )
}

export default AdminJobs