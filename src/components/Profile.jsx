import {
    Avatar, Badge, Box, Button, HStack,
    Link,
    Table,
    Tbody, Td, Text,
    Th, Thead, Tr,
    useBreakpointValue,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import React from 'react';
import { FaDownload, FaPen } from 'react-icons/fa';
import { IoMailOpenOutline } from "react-icons/io5";
import { LuContact } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import firstLetterCapital from '../utils/makeFirstLetterCapital.jsx';
import Navbar from './Navbar';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useQuery } from 'react-query';
import axios from 'axios';
import { applicationBaseUrl } from '../utils/constants.jsx';
import { setAllAppliedJobs } from '../features/JobSlice.js';
import formatDate from "../utils/formatDate.jsx"
axios.defaults.withCredentials = true;
const Profile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user } = useSelector(st => st.auth);
    const { allAppliedJobs } = useSelector(st => st.jobs);
    const dispatch = useDispatch();
    const tableWidth = useBreakpointValue({
        base: '94%', // Mobile and small screens
        md: '80%',   // Tablets
        lg: '70%',  // Laptops and larger screens
    });
    // console.log(allAppliedJobs);

    const { isLoading } = useQuery("allAppliedJobs", async () => {
        try {
            const res = await axios.get(`${applicationBaseUrl}/appliedjob`);
            return res.data;
        } catch (error) {
            throw new Error(error)
        }
    }, {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            // console.log(data);
            dispatch(setAllAppliedJobs(data.data.applications));

        },
        onError: (err) => {
            console.log(err);

        }
    })
    return (
        <>
            <Navbar />
            <VStack mx={"auto"} alignItems={"flex-start"} mt={"40px"} boxShadow={"xl"} pb={"4"} px={"4"} width={tableWidth}>
                <HStack justifyContent={"space-between"} width={"full"}>
                    <HStack gap={"20px"}>
                        <Avatar src={user?.profile?.profilePicture?.secure_url} />

                        <Text fontSize={"medium"} fontWeight={"bolder"}>{user?.fullName && firstLetterCapital(user?.fullName)} </Text>
                    </HStack>



                    <Button bg={"transparent"} _hover={{ bg: "transparent" }} onClick={onOpen}><FaPen fontSize={"15px"} /></Button>
                    <UpdateProfileDialog onClose={onClose} isOpen={isOpen} />
                </HStack>
                <Box as='p' fontSize={"small"} textAlign={'justify'}>{user?.profile?.bio ? firstLetterCapital(user?.profile?.bio) : ""}</Box>
                <VStack alignItems={"flex-start"}> z
                    <HStack>
                        <IoMailOpenOutline />
                        <Link  href={`mailto:${user?.email}`}>{user?.email}</Link>
                    </HStack>
                    <HStack>
                        <LuContact />
                        <Link href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</Link>
                    </HStack>

                </VStack>
                <VStack alignItems={"flex-start"}>
                    <Text fontWeight={"bold"} fontSize={"sm"}>Skills</Text>
                    <HStack flexWrap={"wrap"}>
                        {
                            user?.profile?.skills?.length !== 0 ? user?.profile?.skills?.map((ele, i) => {
                                return <Badge rounded={"full"}colorScheme='green' py={"1"} px={2} key={i}>{ele}</Badge>
                            }) : <Text>NA</Text>
                        }
                    </HStack>
                </VStack>
                <VStack alignItems={"flex-start"}>
                    <Text fontWeight={"bold"} fontSize={"sm"} mb={"-10px"}>Resume</Text>
                    {user?.profile?.resume?.secure_url ? <Link _hover={{ textDecor: "none" }} display={"flex"} alignItems={"center"} gap={"10px"} color={'teal'} href={user?.profile?.resume?.secure_url} download={user?.profile?.resumeOringinalName} target='_blank'>{user?.profile?.resumeOringinalName} <Box as='span'><FaDownload /></Box></Link> : <Text>NA</Text>}
                </VStack>

            </VStack>
            <VStack alignItems={"center"}  mt={"40px"}  mx={"auto"}>
            <Text fontWeight={"bold"} width={tableWidth}>Applied Jobs</Text>

                {
                    allAppliedJobs.length <= 0 ? <Text>No applied jobs..</Text> :
                        <Box
                            overflowX="auto"
                            mx="auto" // Center the table horizontally
                            width={tableWidth} // Apply responsive width
                            boxShadow="md" // Add a subtle shadow
                            borderRadius="md" // Slightly round the corners
                            border="1px solid"
                            borderColor="gray.200" // Light border color
                            bg="white" // White background
                            p={2} // Padding around the table
                           
                        >
                            {
                                allAppliedJobs.length <= 0 ? <Text width={"full"} textAlign={'center'}>No Applied Jobs</Text> : <Table variant="simple" size="sm">
                                    <Thead >
                                        <Tr>
                                            <Th p={2} textAlign="center">Date</Th>
                                            <Th p={2} textAlign="center">Job Role</Th>
                                            <Th p={2} textAlign="center">Company</Th>
                                            <Th p={2} textAlign="center">Status</Th>

                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {/* Example Row */}
                                        {
                                            allAppliedJobs.map((ele, i) => {
                                                return <Tr key={i}>
                                                    <Td p={2} textAlign="center">
                                                        {formatDate(ele.updatedAt)}
                                                    </Td>
                                                    <Td p={2} textAlign="center">{ele?.job?.title && firstLetterCapital(ele.job.title)}</Td>
                                                    <Td p={2} textAlign="center">{ele?.job?.companyId?.name && firstLetterCapital(ele?.job?.companyId?.name)}</Td>

                                                    <Td textAlign={'center'} ><Badge colorScheme={ele?.status === "accepted" ? "green" : ele?.status === "rejected" ? "red" : "gray"}>{ele?.status}</Badge></Td>

                                                </Tr>
                                            })
                                        }
                                        {/* Add more rows as needed */}
                                    </Tbody>
                                </Table>
                            }
                        </Box>
                }
            </VStack>
        </>

    )
}

export default Profile