import { Divider, Text, VStack, Radio, RadioGroup, Box } from '@chakra-ui/react';
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
    }, [selectedFilter])


    return (
        <VStack alignItems={"flex-start"}>
            <Text textAlign={"left"} width={"full"}>Filter Jobs</Text>
            <Divider />
            {
                filterData.map((filter, i) => (
                    <Box key={i} width={"full"}>
                        <Text fontWeight={"bold"}>{filter.filterType}</Text>
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
                    </Box>
                ))
            }
        </VStack>
    );
};

export default FilterCard;
