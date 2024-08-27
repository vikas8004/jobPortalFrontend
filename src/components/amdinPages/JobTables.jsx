import {
    Avatar,
    Box,
    Button,
    HStack,
    Image,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useBreakpointValue
} from '@chakra-ui/react';
import useGetAllCompanies from '../../hooks/useGetAllCompanies.jsx';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye } from 'react-icons/fa';
import { MdMoreHoriz } from "react-icons/md";
import { useSelector } from 'react-redux';
import firstLetterCapital from '../../utils/makeFirstLetterCapital.jsx';
import formatDate from '../../utils/formatDate.jsx';
import { useNavigate } from 'react-router-dom';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs.jsx';
const AdminJobs = () => {
    useGetAllAdminJobs();
    useGetAllCompanies();
    const navigate = useNavigate()
    const { allAdminJobs, serachJobByText } = useSelector((store) => store.jobs);
    // console.log(allCompanies);
    const [filteredJobs, setFilteredJobs] = useState(allAdminJobs);
    // filtering the company data
    useEffect(() => {
        const filJob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!serachJobByText) {
                return true
            }
            return job?.title?.toLowerCase().includes(serachJobByText.toLowerCase())
        });
        setFilteredJobs(filJob);
    }, [allAdminJobs, serachJobByText])
    // Set responsive width for the table container
    const tableWidth = useBreakpointValue({
        base: '99%', // Mobile and small screens
        md: '99%',   // Tablets
        lg: '99%',  // Laptops and larger screens
    });

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
            mt={"30px"}
        >
            {
                filteredJobs.length <= 0 ? <Text width={"full"} textAlign={'center'}>No jobs found</Text> : <Table variant="simple" size="sm">
                    <Thead >
                        <Tr>
                            <Th p={2} textAlign="center">Company Name</Th>
                            <Th p={2} textAlign="center">Role</Th>
                            <Th p={2} textAlign="center">Date</Th>
                            <Th p={2} textAlign="center">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* Example Row */}
                        {
                            filteredJobs.map((ele, i) => {
                                return <Tr key={i}>
                                    <Td p={2} textAlign="center">

                                        {ele?.companyId?.name && firstLetterCapital(ele?.companyId?.name)}
                                    </Td>
                                    <Td p={2} textAlign="center">{ele?.title && firstLetterCapital(ele?.title)}</Td>
                                    <Td p={2} textAlign="center">{formatDate(ele?.updatedAt)}</Td>
                                    <Td p={2} textAlign="center" cursor={"pointer"} >
                                        <Popover >
                                            <PopoverTrigger>
                                                <Button bg={"transparent"} size="sm" _hover={{ bg: "none" }}>
                                                    <MdMoreHoriz fontSize={"20px"} />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverArrow />
                                            <PopoverContent width={"120px"}pl={"10px"}>

                                                <HStack justifyContent={"flex-start"} alignItems={"center"}
                                                    py={2}

                                                    onClick={() => {
                                                        navigate(`/admin/companies/${ele._id}`)

                                                    }}
                                                >
                                                    <FaEdit fontSize={"16px"} />
                                                    <Text fontSize={"16px"}>Edit</Text>
                                                </HStack>
                                                <HStack justifyContent={"start"} alignItems={"center"}
                                                    py={2}
                                                    onClick={() => navigate(`/admin/jobs/${ele._id}/applicants`)}
                                                >
                                                    <FaEye fontSize={"16px"} />
                                                    <Text fontSize={"16px"}>Applicants</Text>
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

export default AdminJobs;
