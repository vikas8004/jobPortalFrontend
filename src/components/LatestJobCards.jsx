import { Badge, Heading, HStack, Text, VStack, Card, CardHeader, CardBody } from '@chakra-ui/react'
import React from 'react'
import firstLetterCapital from '../utils/makeFirstLetterCapital.jsx';

const LatestJobCards = ({ele}) => {
    // console.log(ele);
    
    return (
        <>
            <VStack alignItems={"flex-start"} mb={"20px"}>
                <Card variant={"elevated"} boxShadow={"0px 0px 9px 3px gray"}>
                    <CardHeader>
                        <Heading as={"h2"} fontSize={"15px"}>{ele?.companyId?.name&&firstLetterCapital(ele?.companyId?.name)}</Heading>
                        <Text>{ele?.location&&firstLetterCapital(ele?.location)}</Text>
                    </CardHeader>
                    <CardBody mt={"-30px"}>
                        <VStack alignItems={"flex-start"}>
                            <Text fontWeight={"bold"} fontSize={"sm"}>{ele?.title&&firstLetterCapital(ele?.title)}</Text>
                            <Text noOfLines={3}>{ele?.description&&firstLetterCapital(ele?.description)}</Text>
                        </VStack>
                        <HStack gap={"20px"} mt={"10px"}>
                            <Badge fontWeight={"bold"} fontSize={"10px"} colorScheme='blue'>{ele?.position} positions</Badge>
                            <Badge fontWeight={"bold"} fontSize={"10px"} colorScheme='red'>{ele?.jobType&&firstLetterCapital(ele?.jobType)}</Badge>
                            <Badge fontWeight={"bold"} fontSize={"10px"} colorScheme='purple'>{ele?.salary}</Badge>
                        </HStack>
                    </CardBody>
                </Card>
            </VStack>
        </>
    )
}

export default LatestJobCards