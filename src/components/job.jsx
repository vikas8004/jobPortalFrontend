import { Avatar, Badge, Box, Button, Divider, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FaRegBookmark } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import firstLetterCapital from '../utils/makeFirstLetterCapital.jsx';
import calculateDays from '../utils/calculateDays.jsx';


const Job = ({ele}) => {
    const navigate = useNavigate();
    // console.log(ele);

    
    return (
        <>
            <Box boxShadow={"3px 4px 10px 2px gray"} px={"3"} py={1} pb={3} rounded={"sm"}>
                <HStack justifyContent={"space-between"}>
                    <Box as='p'>{calculateDays(ele?.updatedAt)===0?"Today":`${calculateDays(ele?.updatedAt)} days ago`}</Box>
                    <Button rounded={"full"} boxSize={"45px"} bg={"transparent"} _hover={{ bg: "transparent" }}><FaRegBookmark /></Button>
                </HStack>
                <HStack >
                    <Avatar src={ele?.companyId?.logo?.secure_url} boxSize={"30px"} />
                    <Stack gap={"0px"}>
                        <Text fontSize={"15px"}>{ele?.companyId?.name&&firstLetterCapital(ele?.companyId?.name)}</Text>
                        <Box as='p'>{ele?.location&&firstLetterCapital(ele?.location)}</Box>
                    </Stack>
                </HStack>
                <VStack alignItems={"start"}>
                    <Text fontWeight={"bold"}>{ele?.title&&firstLetterCapital(ele?.title)}</Text>
                    <Text  noOfLines={"4"} lineHeight={"20px"} fontSize={"medium"} color={"gray.700"}>{ele?.description&&firstLetterCapital(ele?.description)}</Text>
                </VStack>
                <HStack gap={"20px"} mt={"10px"}>
                    <Badge fontWeight={"bold"} fontSize={"10px"} colorScheme='blue'>{ele?.position} positions</Badge>
                    <Badge fontWeight={"bold"} fontSize={"10px"} colorScheme='red'>{ele?.jobType&&firstLetterCapital(ele?.jobType)}</Badge>
                    <Badge fontWeight={"bold"} fontSize={"10px"} colorScheme='purple'>{ele?.salary}</Badge>
                </HStack>
                <HStack mt={"10px"}>
                    <Button onClick={() => navigate(`/job/description/${ele._id}`)} fontWeight={"bold"} variant={"outline"} fontSize={"small"} >Details</Button>
                  
                </HStack>
                
            </Box>
        </>
    )
}

export default Job