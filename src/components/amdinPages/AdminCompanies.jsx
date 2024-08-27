import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { Box, Button, HStack, Input, VStack } from '@chakra-ui/react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchInputText } from '../../features/companySlice.js'

const AdminCompanies = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState("");

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSearchInputText(input))
    }, [input])
    return (
        <>
            <Navbar />
            <VStack px={["20px", "70px"]} alignItems={"flex-start"} mt={"20px"} width={"full"}>
                <HStack justifyContent={"space-between"} width={"full"}>
                    <Input placeholder='filter company' width={["40%", "35%", "25%", "20%"]} borderColor={'black'} focusBorderColor='black' onChange={(e) => setInput(e.target.value)} value={input} />
                    <Box>
                        <Button size={"sm"} bgColor={"black"} color={'white'} _hover={{ color: "white", bg: "black" }}
                            px={"4px"} fontWeight={"bold"} onClick={() => navigate("/admin/companies/create")}
                            fontSize={"small"}>New Company</Button>
                    </Box>
                </HStack>
                <CompaniesTable />
            </VStack>
        </>
    )
}

export default AdminCompanies