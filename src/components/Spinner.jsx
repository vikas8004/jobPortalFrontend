import React from "react";
import { Spinner, Box, Flex } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0, 0, 0, 0.2)"
      zIndex="9999"
    >
      <Spinner size="xl" thickness="4px" speed="0.65s" color="blue" />
    </Flex>
  );
};

export default Loader;