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
        base: '99%', // Mobile and small screens
        md: '80%',   // Tablets
        lg: '100%',  // Laptops and larger screens
    });
    console.log(allAppliedJobs);

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
            <VStack mx={"auto"} alignItems={"flex-start"} mt={"40px"} boxShadow={"xl"} pb={"4"} px={"2"} width={["90%", '80%', "70%"]}>
                <HStack justifyContent={"space-between"} width={"full"}>
                    <HStack gap={"20px"}>
                        <Avatar src={user?.profile?.profilePicture?.secure_url} />
                        <VStack alignItems={"flex-start"}>
                            <Text fontSize={"medium"}>{user?.fullName && firstLetterCapital(user?.fullName)} </Text>
                            <Box as='p' fontSize={"small"}>{user?.profile?.bio ? firstLetterCapital(user?.profile?.bio) : ""}</Box>
                        </VStack>

                    </HStack>
                    <Button bg={"transparent"} _hover={{ bg: "transparent" }} onClick={onOpen}><FaPen /></Button>
                    <UpdateProfileDialog onClose={onClose} isOpen={isOpen} />
                </HStack>
                <VStack alignItems={"flex-start"}> z
                    <HStack>
                        <IoMailOpenOutline />
                        <Box as='span'>{user?.email}</Box>
                    </HStack>
                    <HStack>
                        <LuContact />
                        <Box as='span'>{user?.phoneNumber}</Box>
                    </HStack>

                </VStack>
                <VStack alignItems={"flex-start"}>
                    <Text>Skills</Text>
                    <HStack>
                        {
                            user?.profile?.skills?.length !== 0 ? user?.profile?.skills?.map((ele, i) => {
                                return <Badge colorScheme='green' p={"1"} key={i}>{ele}</Badge>
                            }) : <Text>NA</Text>
                        }
                    </HStack>
                </VStack>
                <VStack alignItems={"flex-start"}>
                    <Text>Resume</Text>
                    {user?.profile?.resume?.secure_url ? <Link _hover={{ textDecor: "none" }} display={"flex"} alignItems={"center"} gap={"10px"} color={'teal'} href={user?.profile?.resume?.secure_url} download={user?.profile?.resumeOringinalName} target='_blank'>{user?.profile?.resumeOringinalName} <Box as='span'><FaDownload /></Box></Link> : <Text>NA</Text>}
                </VStack>

            </VStack>
            <VStack alignItems={"flex-start"} mx={["40px", "70px"]} mt={"20px"}>

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
                            mt={"30px"}
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

                                                    <Td textAlign={'center'} ><Badge colorScheme={ele?.status==="accepted"?"green":ele?.status==="rejected"?"red":"gray"}>{ele?.status}</Badge></Td>

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