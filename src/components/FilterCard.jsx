import { Divider, Text, VStack, Radio, RadioGroup, Box } from '@chakra-ui/react'
import React from 'react'


const filterData = [{
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Pune", "Mumbai"]
},
{
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
},
{
    filterType: "Salary",
    array: ["0-40K", "40k-1lakh", "1lakh-5lakh"]
}

]
const FilterCard = () => {
    
    return (
        <VStack alignItems={"flex-start"}>

            <Text textAlign={"left"} width={"full"}>Filter Jobs</Text>
            <Divider />
            <RadioGroup colorScheme='black'>
                {
                    filterData.map((el, i) => {
                        const {filterType}=el;
                        
                        
                        return <Box key={i}>
                            <Text fontWeight={"bold"}>{el.filterType}</Text>
                            <RadioGroup colorScheme="blackAlpha">
                                {
                                    el.array.map((el, i) => {
                                        return <Box key={i}>
                                            <Radio value={el}>{el}</Radio>
                                        </Box>
                                    })
                                }
                            </RadioGroup>
                        </Box>
                    })
                }
            </RadioGroup>
        </VStack>
    )
}

export default FilterCard