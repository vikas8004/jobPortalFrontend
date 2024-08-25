import { Box, Container, Stack, Text, Link, useColorModeValue, IconButton } from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={2}
        spacing={2}
        justify={"center"}
        align={"center"}
      >
        <Text fontSize={"lg"} fontWeight={"bold"}>
          jobPortal
        </Text>
        <Stack direction={"row"} spacing={4}>
          <Link href={"https://github.com/vikas8004"} isExternal>
            <IconButton
              aria-label="GitHub"
              icon={<FaGithub />}
              size="lg"
              variant="ghost"
            />
          </Link>
          <Link href={"https://twitter.com"} isExternal>
            <IconButton
              aria-label="Twitter"
              icon={<FaTwitter />}
              size="lg"
              variant="ghost"
            />
          </Link>
          <Link href={"https://linkedin.com"} isExternal>
            <IconButton
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              size="lg"
              variant="ghost"
            />
          </Link>
          <Link href="mailto:vikas80046@gmail.com" isExternal>
            <IconButton
              aria-label="Email"
              icon={<FaEnvelope />}
              size="lg"
              variant="ghost"
            />
          </Link>
          <Link href="tel:+7239087850">
            <IconButton
              aria-label="Call"
              icon={<FaPhoneAlt />}
              size="lg"
              variant="ghost"
            />
          </Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          spacing={4}
          justify={"center"}
          align={"center"}
        >
          <Text>© 2024 jobPortal. All rights reserved.</Text>
        </Container>
      </Box>
    </Box>
  );
}
