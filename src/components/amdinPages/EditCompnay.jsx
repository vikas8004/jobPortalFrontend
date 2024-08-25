import React, { useRef, useState } from 'react'
import Navbar from '../Navbar'
import { Box, Button, FormControl, FormLabel, Grid, GridItem, HStack, Input, Stack, Text, useToast } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { companyBaseUrl } from '../../utils/constants.jsx'
import { useNavigate, useParams } from 'react-router-dom';


axios.defaults.withCredentials = true
const EditCompnay = () => {
    const params = useParams();
    const navigate = useNavigate();
    const comId = params.id;
    const fileRef = useRef()
    const toast = useToast();
    const queryClient = useQueryClient();
    const [inputVal, setInputVal] = useState({
        name: "",
        description: "",
        location: "",
        website: "",
        logo: null

    });
    const onChangeHandler = (e) => {

        setInputVal({ ...inputVal, [e.target.name]: e.target.value })
    }
    const submitHandlerLogic = async (values) => {
        try {
            const companyData = new FormData();
            companyData.append("name", inputVal.name);
            companyData.append("description", inputVal.description);
            companyData.append("location", inputVal.location);
            companyData.append("website", inputVal.website);
            companyData.append("logo", inputVal.logo);
            const res = await axios.patch(`${companyBaseUrl}/update/${comId}`, companyData);
            return res.data;
        } catch (error) {
            console.log(error);

            throw new Error(error)
        }
    }

    // using mutation
    const { mutate, isLoading } = useMutation(submitHandlerLogic, {
        onSuccess: (data) => {
            // console.log(data);
            toast({
                isClosable: true,
                duration: 3000,
                description: data.data.msg,
                position: "top-right",
                status: "success"
            });
            setInputVal({
                name: "",
                description: "",
                location: "",
                website: "",
                logo: null
            })
            fileRef.current.value = null;
            queryClient.invalidateQueries("allCompanies");
            navigate("/admin/companies")
        },
        onError: (err) => {
            console.log(err);

        },

    });
    const submitHandler = () => {
        mutate(inputVal)

    }
    return (
        <>
            <Navbar />
            <Stack px={["40px", "70px"]} mt={"20px"} maxWidth={["95%", "100%", "80%", "70%"]} mx={"auto"}>
                <HStack width={"full"} justifyContent={"space-between"}>
                    <Button variant={"outline"} size={"sm"} onClick={() => navigate("/admin/companies")}>
                        <FaArrowLeft /> <Box ml={"10px"} as='span' >Back</Box>
                    </Button>
                    <Box><Text fontWeight={"bold"}>Edit Company</Text></Box>
                </HStack>
                <Grid gridTemplateColumns={["repeat(1,1fr)", "repeat(2,1fr)", "repeat(2,1fr)", "repeat(2,1fr)"]} gap={"20px"} mt={"30px"}>
                    <GridItem>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input name='name' onChange={onChangeHandler} value={inputVal.name} />
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input name='description' onChange={onChangeHandler} value={inputVal.description} />
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl>
                            <FormLabel >Website</FormLabel>
                            <Input name="website" onChange={onChangeHandler} value={inputVal.website} />
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl>
                            <FormLabel>Location</FormLabel>
                            <Input name='location' onChange={onChangeHandler} value={inputVal.location} />
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl>
                            <FormLabel>Logo</FormLabel>
                            <Input type='file' name='logo' accept='image/*' onChange={(e) => {
                                const file = e.target.files[0];
                                setInputVal({ ...inputVal, [e.target.name]: file })

                            }}

                                ref={fileRef} />
                        </FormControl>
                    </GridItem>
                </Grid>
                <Button bg='black' color={"white"} variant={"outline"}
                    _hover={{ color: "white", bg: "gray.800" }}
                    mt={["20px", 3, 3, 3]}
                    isDisabled={!inputVal.name && !inputVal.description && !inputVal.logo && !inputVal.location && !inputVal.website}
                    onClick={submitHandler}
                    isLoading={isLoading}
                    loadingText={"updating..."}
                >Update</Button>
            </Stack>
        </>
    )
}

export default EditCompnay