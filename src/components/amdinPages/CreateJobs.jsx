import { Box, Button, FormControl, FormLabel, Grid, GridItem, HStack, Input, Select, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { jobBaseUrl } from '../../utils/constants.jsx'
import firstLetterCapital from '../../utils/makeFirstLetterCapital'
import Navbar from '../Navbar'

axios.defaults.withCredentials = true

const CreateJobs = () => {
    const params = useParams();
    const navigate = useNavigate();
    const comId = params.id;
    const toast = useToast();
    const queryClient = useQueryClient();
    useGetAllCompanies();
    const { allCompanies } = useSelector(store => store.company)
    // console.log(allCompanies);


    const [inputVal, setInputVal] = useState({
        title: "",
        description: "",
        experience: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",  // Ensure this matches with the Select field
        position: "",
        companyId: ""
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputVal({ ...inputVal, [name]: value });
    };

    const submitHandlerLogic = async () => {
        try {
            const res = await axios.post(`${jobBaseUrl}/post`, inputVal);
            return res.data;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    };

    const { mutate, isLoading } = useMutation(submitHandlerLogic, {
        onSuccess: (data) => {
            console.log(data);
            
            toast({
                isClosable: true,
                duration: 3000,
                description: data.data.msg,
                position: "top-right",
                status: "success"
            });
            setInputVal({
                title: "",
                description: "",
                experience: "",
                requirements: "",
                salary: "",
                location: "",
                jobType: "",  // Ensure this matches with the Select field
                position: "",
                companyId: ""
            });
            queryClient.invalidateQueries("allAdminJobs");
            navigate("/admin/jobs");
        },
        onError: (err) => {
            console.log(err);
        }
    });

    const submitHandler = () => {
        mutate()

    };

    return (
        <>
            <Navbar />
            <Stack px={["40px", "70px"]} mt={"20px"} maxWidth={["95%", "100%", "80%", "70%"]} mx={"auto"} mb={"30px"}>
                <HStack width={"full"} justifyContent={"space-between"}>
                    <Button variant={"outline"} size={"sm"} onClick={() => navigate("/admin/jobs")}>
                        <FaArrowLeft /> <Box ml={"10px"} as='span' >Back</Box>
                    </Button>
                    <Box><Text fontWeight={"bold"}>Create Job</Text></Box>
                </HStack>
                <Grid gridTemplateColumns={["repeat(1,1fr)", "repeat(2,1fr)", "repeat(2,1fr)", "repeat(2,1fr)"]} gap={"20px"} mt={"30px"}>
                    <GridItem>
                        <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input name='title' onChange={onChangeHandler} value={inputVal.title} />
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
                            <FormLabel >Experience</FormLabel>
                            <Input name="experience" onChange={onChangeHandler} value={inputVal.experience} />
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
                            <FormLabel>Requirements</FormLabel>
                            <Input name='requirements'
                                onChange={onChangeHandler} value={inputVal.requirements}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl>
                            <FormLabel>Salary</FormLabel>
                            <Input name='salary'
                                onChange={onChangeHandler} value={inputVal.salary}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl>
                            <FormLabel>Job Type</FormLabel>
                            <Select placeholder='Select job type' onChange={onChangeHandler} value={inputVal.jobType} name='jobType'>
                                <option value='Full Time'>Full time</option>
                                <option value='Part Time'>Part time</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                    <GridItem>
                        <FormControl>
                            <FormLabel>Position</FormLabel>
                            <Input name='position'
                                onChange={onChangeHandler} value={inputVal.position}
                                type='number'
                            />
                        </FormControl>
                    </GridItem>
                    {allCompanies.length > 0 && <GridItem>
                        <FormControl>
                            <FormLabel>Company</FormLabel>
                            <Select
                                placeholder='Select a company'
                                name='companyId'
                                onChange={onChangeHandler}
                                value={inputVal.companyId}
                            >
                                {allCompanies.map((el, i) => {
                                    return <option value={el._id} key={i}>{el?.name && firstLetterCapital(el?.name)}</option>
                                })}
                            </Select>
                        </FormControl>
                    </GridItem>}
                </Grid>
                <Button bg='black' color={"white"} variant={"outline"}
                    _hover={{ color: "white", bg: "gray.800" }}
                    mt={["20px", 3, 3, 3]}
                    onClick={submitHandler}
                    isLoading={isLoading}
                    loadingText={"Creating..."}
                >Create</Button>
                <Box>{allCompanies.length === 0 && <Text textAlign={"center"} color={"red"}>Please register a company.</Text>}</Box>
            </Stack>
        </>
    )
}

export default CreateJobs;
