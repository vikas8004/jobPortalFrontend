import {
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
import { FaEdit } from 'react-icons/fa';
import { MdMoreHoriz } from "react-icons/md";
import { useSelector } from 'react-redux';
import firstLetterCapital from '../../utils/makeFirstLetterCapital.jsx';
import formatDate from '../../utils/formatDate.jsx';
import { useNavigate } from 'react-router-dom';
const CompaniesTable = () => {
    useGetAllCompanies();
    const navigate = useNavigate()
    const { allCompanies, searchInputText } = useSelector((store) => store.company);
    // console.log(allCompanies);
    const [filteredCompany, setFilteredCompany] = useState(allCompanies);
    // filtering the company data
    useEffect(() => {
        const filCom = allCompanies.length >= 0 && allCompanies.filter((company) => {
            if (!searchInputText) {
                return true
            }
            return company?.name?.toLowerCase().includes(searchInputText.toLowerCase())
        });
        setFilteredCompany(filCom);
    }, [allCompanies, searchInputText])
    // Set responsive width for the table container
    const tableWidth = useBreakpointValue({
        base: '99%', // Mobile and small screens
        md: '80%',   // Tablets
        lg: '100%',  // Laptops and larger screens
    });

    return (
        <Box
            overflowX="auto"
            mx="auto" // Center the table horizontally
            width={"full"} // Apply responsive width
            boxShadow="md" // Add a subtle shadow
            borderRadius="md" // Slightly round the corners
            border="1px solid"
            borderColor="gray.200" // Light border color
            bg="white" // White background
            p={2} // Padding around the table
            mt={"30px"}
        >
            {
                filteredCompany.length <= 0 ? <Text width={"full"} textAlign={'center'}>No companies found</Text> : <Table variant="simple" size="sm">
                    <Thead >
                        <Tr>
                            <Th p={2} textAlign="center">Logo</Th>
                            <Th p={2} textAlign="center">Name</Th>
                            <Th p={2} textAlign="center">Date</Th>
                            <Th p={2} textAlign="center">Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {/* Example Row */}
                        {
                            filteredCompany.map((ele, i) => {
                                return <Tr key={i}>
                                    <Td p={2} textAlign="center">
                                        <Image
                                            src={ele?.logo?.secure_url}
                                            alt="Company Logo"
                                            boxSize="40px"
                                            objectFit="cover"
                                            borderRadius="full"
                                            mx="auto"
                                        />
                                    </Td>
                                    <Td p={2} textAlign="center">{ele?.name && firstLetterCapital(ele?.name)}</Td>
                                    <Td p={2} textAlign="center">{formatDate(ele?.updatedAt)}</Td>
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
                                                        navigate(`/admin/companies/${ele._id}`)

                                                    }}
                                                >
                                                    <FaEdit fontSize={"20px"} />
                                                    <Text fontSize={"17px"}>Edit</Text>
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

export default CompaniesTable;
