import React, { useState } from 'react'
import Navbar from '../Navbar'
import { Box, Button, ButtonGroup, FormControl, FormLabel, Heading, Input, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query';
import axios from 'axios';
import { companyBaseUrl } from '../../utils/constants.jsx';
import { useDispatch } from 'react-redux';
import { setSingleCompnay } from '../../features/companySlice.js';
axios.defaults.withCredentials = true;
const CreateCompany = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const [inputVal, setInputVal] = useState("")
    const updateHandlerLogic = async (values) => {
        try {
            const res = await axios.post(`${companyBaseUrl}/register`, { name: inputVal });
            return res.data
        } catch (error) {
            console.log(error);
            toast({
                isClosable: true,
                duration: 3000,
                status: "error",
                position: "top-right",
                description: error.response.data.message
            })
            throw new Error(error)

        }

    }
    // using useMutation
    const { mutate, isLoading } = useMutation(updateHandlerLogic, {
        onSuccess: (data) => {
            // console.log(data);
            toast({
                isClosable: true,
                duration: 3000,
                status: "success",
                position: "top-right",
                description: data.data.msg
            })
            setInputVal("");
            dispatch(setSingleCompnay(data.data.createdCompany));
            navigate(`/admin/companies/${data.data.createdCompany._id}`);

        },
        onError: (err) => {
            console.log(err);



        }
    })
    const updateHandler = () => {
        mutate(inputVal)
    }
    return (
        <>
            <Navbar />
            <VStack px={["20px", "70px"]} mt={"30px"} alignItems={"flex-start"} width={["95%","85%","75%"]} mx={"auto"}>
                <Box>
                    <Heading as={"h2"} size={'md'}>Your company name</Heading>
                    <Text>Give a name to your. Don't worry you can change it later.</Text>
                </Box>
                <Stack width={"100%"} mt={"40px"}>
                    <FormControl width={"100%"}>
                        <FormLabel>Company name</FormLabel>

                        <Input width={"100%"} focusBorderColor='black' placeholder='microsoft,google,accenture'
                            onChange={(e) => setInputVal(e.target.value)}
                            value={inputVal}
                            name='name'
                        />

                    </FormControl>
                    <ButtonGroup mt={"20px"}>
                        <Button size={"sm"} variant={"outline"}
                            onClick={() => navigate("/admin/companies")}
                        >Cancel</Button>
                        <Button size={"sm"} variant={"solid"}
                            bg={"black"} color={"white"} _hover={{ bg: "gray.800", color: "white" }}

                            onClick={() => updateHandler()}

                            isLoading={isLoading}
                            loadingText={"Creating..."}
                            isDisabled={!inputVal}
                        >Continue</Button>
                    </ButtonGroup>
                </Stack>
            </VStack>
        </>
    )
}

export default CreateCompany