import { Text, VStack } from '@chakra-ui/react'
import React from 'react'

const CategoryCarauosel = () => {
    const category = ["Frontend Developer", "Backend Developer", "Fullstack Develper", "Graphic Designer"]
    return (
        <VStack mt={"10px"} gap={"15px"} px={["40px", "70px"]}>

            <Text>category</Text>
        </VStack>
    )
}

export default CategoryCarauosel