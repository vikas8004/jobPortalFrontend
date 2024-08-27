import { Divider, Text, VStack, Radio, RadioGroup, Box, HStack, useBreakpointValue, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
    },
    {
        filterType: "Salary",
        array: ["3lpa", "5lpa", "15lpa"]
    }
];

const FilterCard = ({ applyFilter }) => {
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleFilterChange = (filterType, value) => {
        setSelectedFilter(value);
    };

    useEffect(() => {
        applyFilter(selectedFilter);
    }, [selectedFilter]);

    const textSize = useBreakpointValue({ base: 'sm', md: 'lg' });
    const spacing = useBreakpointValue({ base: 2, md: 6 });

    return (
        <VStack alignItems={"flex-start"} spacing={spacing} width={"full"}>
            <Text textAlign={"left"} width={"full"} fontSize={textSize}>Filter Jobs</Text>
            <Divider />
            {
                filterData.map((filter, i) => (
                    <Box key={i} width={"full"}>
                        <Text fontWeight={"bold"} fontSize={textSize} mb={2}>{filter.filterType}</Text>
                        <HStack
                            spacing={4}
                            wrap={"wrap"}
                            justifyContent={"flex-start"}
                        >
                            <RadioGroup
                                value={selectedFilter}
                                onChange={(value) => { handleFilterChange(filter.filterType, value) }}
                                colorScheme='red'
                            >
                                {filter.array.map((option, j) => (
                                    <Box key={j}>
                                        <Radio value={option}>{option}</Radio>
                                    </Box>
                                ))}
                            </RadioGroup>
                        </HStack>
                    </Box>
                ))
            }
        </VStack>
    );
};

export default FilterCard;
