import { Box, Button, Input, InputGroup, InputRightElement, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setSerachQuery } from '../features/JobSlice.js';
import { useNavigate } from 'react-router-dom';

const Herosection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = () => {
        dispatch(setSerachQuery(query));
        navigate("/browse");

    }
    return (
        <VStack mt={"10px"} gap={"15px"} >

            <Text as={"h3"} mt={"40px"} fontWeight={"bold"} bg={"gray.100"} color={"#F83002"} rounded={"full"} p={2}>No.1 site for hunting the tech jobs.</Text>
            <Text fontSize={"30px"} fontWeight={"bold"} textAlign={"center"}>Search, Apply & <br /> Get Your <Box as={"span"}
                color={"#6A38C2"}> Dream Job</Box></Text>
            <Text textAlign={"center"} fontWeight={"medium"} width={["90%","90%","full","full"]} fontSize={"sm"} >Your dream job is just a click away. Discover opportunities, unlock potential, and step confidently into your future.</Text>
            <Box width={"full"} display={"flex"} justifyContent={"center"}>
                <InputGroup width={["90%","90%","70%","70%"]}>
                    <Input rounded={"full"} focusBorderColor='#6A38C2' border={".5px solid gray"}
                        placeholder='Find your dream Job'
                        _placeholder={{ color: "#6A38C2", }}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <InputRightElement cursor={'pointer'} width={"50px"} fontSize={"20px"} bgColor={"#6A38C2"} _hover={{ bg: "black" }} sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} rounded={"full"}
                        onClick={searchJobHandler}
                    >
                        <Button fontSize={"20px"} bg={"transparent"} _hover={{ bg: "transparent" }} isDisabled={!query}><IoMdSearch color='white' /></Button>
                    </InputRightElement>
                </InputGroup>
            </Box>
        </VStack>
    )
}

export default Herosection