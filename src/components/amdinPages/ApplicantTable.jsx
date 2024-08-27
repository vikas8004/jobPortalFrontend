import {
    Box,
    Button,
    HStack,
    Link,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
    Spinner,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue,
    useToast
} from '@chakra-ui/react';
import React from 'react';
import { FaDownload, FaEdit } from 'react-icons/fa';
import { MdMoreHoriz } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../../hooks/useGetAllCompanies.jsx';
import firstLetterCapital from '../../utils/makeFirstLetterCapital.jsx';
import formatDate from '../../utils/formatDate.jsx';
import { useMutation } from 'react-query';
import axios from 'axios';
import { applicationBaseUrl } from '../../utils/constants.jsx';
axios.defaults.withCredentials = true;
const ApplicantTable = () => {
    useGetAllCompanies();
    const { applicants } = useSelector(store => store.application);
    const toast = useToast();
    // Set responsive width for the table container
    const tableWidth = useBreakpointValue({
        base: '100%', // Mobile and small screens
        md: '100%',   // Tablets
        lg: '100%',  // Laptops and larger screens
    });

    // handling the status of the application;
    const { mutate, isLoading } = useMutation(async ({ status, id }) => {

        try {
            const res = await axios.patch(`${applicationBaseUrl}/status/update/${id}`, { status });
            return res.data;
        } catch (error) {
            throw new Error(error);
        }
    }, {
        onSuccess: (data) => {
            console.log(data);
            toast({
                isClosable: true,
                status: "success",
                description: data.data.msg,
                duration: 3000,
                position: "top-right"
            })

        },
        onError: (err) => {
            console.log(err);

        }
    })
    const statusUpdater = async (status, id) => {
        mutate({ status, id })
    }


    return (
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
            mt={"10px"}
        >
            {
                applicants.length <= 0 ? <Text width={"full"} textAlign={'center'}>No companies found</Text> : <Table variant="simple" size="sm">
                    <Thead >
                        <Tr>
                            <Th p={2} textAlign="center">Fullname</Th>
                            <Th p={2} textAlign="center">Email</Th>
                            <Th p={2} textAlign="center">Contact</Th>
                            <Th p={2} textAlign="center">Resume</Th>
                            <Th p={2} textAlign="center">Date</Th>
                            <Th p={2} textAlign="center">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* Example Row */}
                        {
                            applicants.map((ele, i) => {


                                return <Tr key={i}>
                                    <Td p={2} textAlign="center">
                                        {firstLetterCapital(ele.applicant.fullName)}
                                    </Td>
                                    <Td p={2} textAlign="center">{ele.applicant.email}</Td>
                                    <Td p={2} textAlign="center">{ele.applicant.phoneNumber}</Td>
                                    <Td textAlign={"center"}>{ele?.applicant?.profile?.resume?.secure_url ? <Link justifyContent={"center"} _hover={{ textDecor: "none" }} display={"flex"} alignItems={"center"} gap={"10px"} href={ele?.applicant?.profile?.resume?.secure_url} download={ele?.applicant?.profile?.resumeOringinalName} target='_blank'>{ele?.applicant?.profile?.resumeOringinalName} <Box as='span'><FaDownload /></Box></Link> : <Text>NA</Text>}</Td>
                                    <Td textAlign={'center'}>{formatDate(ele?.updatedAt)}</Td>
                                    <Td p={2} textAlign="center" cursor={"pointer"} >
                                        <Popover >
                                            <PopoverTrigger>
                                                <Button bg={"transparent"} size="sm" _hover={{ bg: "none" }}>
                                                    <MdMoreHoriz fontSize={"20px"} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverArrow />
                                            <PopoverContent width={"100px"} >

                                                <HStack justifyContent={"center"} alignItems={"center"}
                                                    py={2}

                                                    onClick={() => {
                                                        statusUpdater("accepted", ele._id);

                                                    }}
                                                >
                                                   
                                                    <Text fontSize={"16px"}>{isLoading ? <Spinner /> : "Accept"}</Text>
                                                </HStack>
                                                <HStack justifyContent={"center"} alignItems={"center"}
                                                    py={2}

                                                    onClick={() => {
                                                        statusUpdater("rejected", ele._id);

                                                    }}
                                                >
                                                   
                                                    <Text fontSize={"16px"}>{isLoading ? <Spinner /> : "Reject"}</Text>
                                                </HStack>
                                            </PopoverContent>
                                        </Popover>
                                    </Td>
                                </Tr>
                            })
                        }
                        {/* Add more rows as needed */}
                    </Tbody>
                </Table>
            }
        </Box>
    );
};

export default ApplicantTable;
