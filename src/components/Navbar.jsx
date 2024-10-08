import {
    Avatar, Box, Button, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, PopoverTrigger, Portal, Text, useDisclosure, useToast, VStack
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMutation } from 'react-query'
import { userBaseUrl } from '../utils/constants.jsx';
import { setUser } from '../features/authFeatures.js'
import firstLetterCapital from '../utils/makeFirstLetterCapital.jsx';
import { CiMenuFries } from "react-icons/ci";

axios.defaults.withCredentials = true

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
    const logOutHandlerLogic = async () => {
        try {
            const res = await axios.post(`${userBaseUrl}/logout`);
            return res.data;
        } catch (error) {

            console.log(error);
            throw new Error(error)

        }
    }
    // using mutation
    const { mutate, isLoading } = useMutation(logOutHandlerLogic, {
        onSuccess: (data) => {
            console.log(data);
            dispatch(setUser(null));
            toast({
                status: "success",
                description: data.data,
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            navigate("/")


        },
        onError: (err) => {
            console.log(err);

        }
    })
    // logoutHander
    const logOutHandler = () => {
        onClose();
        mutate();
    }
    return (
        <HStack as={"div"} display={"flex"} width={"full"} justifyContent={"space-between"} px={["15px", "15px", "4px"]} mt={"3px"}
            height={"40px"} zIndex={99}>
            <Box><Text fontSize={"larger"} fontWeight={"bolder"}>Job<Box as='span' color={"#F83002"}>Portal</Box></Text></Box>

            <Button bgColor={"#f83002"} _hover={{ bg: '#f83002' }} onClick={onOpen} display={["block", "block", "none", "none"]}><CiMenuFries fontWeight={"bolder"} fontSize={"20px"} /></Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                closeOnOverlayClick={false}

            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton mt={"10px"} />
                    <DrawerHeader><Box><Text fontSize={"larger"} fontWeight={"bolder"}>Job<Box as='span' color={"#F83002"}>Portal</Box></Text></Box></DrawerHeader>

                    <DrawerBody height={"full"}>
                        <Box height={'full'} >
                            <VStack position={'relative'} width={"full"} gap={"10px"} height={"full"} >
                                <Box width={"full"} as='ul' display={"flex"} alignItems={"flex-start"} flexDirection={"column"} gap={"10px"} listStyleType={"none"}>
                                    {
                                        user?.role === "recruiter"
                                            ? <>
                                                <li>
                                                    <Link to={"/admin/companies"}>Companies</Link>
                                                </li>
                                                <li>
                                                    <Link to={"/admin/jobs"}>Jobs</Link>
                                                </li>
                                            </>
                                            : <><li><Link to={"/"} onClick={onClose}>Home</Link></li>
                                                <li><Link onClick={onClose} to={"/jobs"}>Jobs</Link></li></>
                                    }
                                </Box>

                                {
                                    !user ? <HStack justifyContent={"flex-start"} gap={"20px"} width={"full"} mt={"10px"}>
                                        <Link to={"/login"}><Button size={"sm"} fontWeight={"bold"} variant={"outline"}>Login</Button></Link>
                                        <Link to={"/signup"}><Button size={"sm"} fontWeight={"bold"} variant={"outline"} color={"white"} bg={"#6a36C2"}
                                            _hover={{ bg: "#5b30a6" }}
                                        >Singup</Button></Link>
                                    </HStack> :

                                        <>


                                            <VStack position={"absolute"} bottom={0}
                                                width={"full"} alignItems={"start"} >



                                                <HStack
                                                    gap={"-10px"} justifyContent={"space-between"} width={"full"}>
                                                    {user?.role === "student" ? <Button
                                                        colorScheme='blue'
                                                        variant={"outline"}
                                                        fontWeight={"normal"}

                                                    ><Link to={"/profile"}>View Profile</Link></Button> : ""}
                                                    <Button

                                                        fontWeight={"normal"}
                                                        colorScheme='orange'
                                                        variant={"outline"}
                                                        onClick={() => logOutHandler()}
                                                        isLoading={isLoading}
                                                        loadingText={"LoggingOut...."}


                                                    >Logout</Button>
                                                </HStack>
                                            </VStack>

                                        </>
                                }

                            </VStack>
                        </Box>
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
            <Box display={["none", "none", "block", "block"]}>
                <HStack gap={"30px"} >
                    <Box as='ul' display={"flex"} justifyContent={"space-evenly"} gap={"20px"} listStyleType={"none"}>
                        {
                            user?.role === "recruiter"
                                ? <>
                                    <li>
                                        <Link to={"/admin/companies"}>Companies</Link>
                                    </li>
                                    <li>
                                        <Link to={"/admin/jobs"}>Jobs</Link>
                                    </li>
                                </>
                                : <><li><Link to={"/"}>Home</Link></li>
                                    <li><Link to={"/jobs"}>Jobs</Link></li></>
                        }
                    </Box>

                    {
                        !user ? <HStack>
                            <Link to={"/login"}><Button fontWeight={"bold"} variant={"outline"}>Login</Button></Link>
                            <Link to={"/signup"}><Button fontWeight={"bold"} variant={"outline"} color={"white"} bg={"#6a36C2"}
                                _hover={{ bg: "#5b30a6" }}
                            >Singup</Button></Link>
                        </HStack> : <Popover>
                            <PopoverTrigger>
                                <Avatar boxSize={"30px"} cursor={"pointer"} src={user?.profile?.profilePicture?.secure_url} />
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                    <PopoverArrow />

                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <VStack alignItems={"flex-start"} width={"full"}>
                                            <HStack alignItems={"center"}>
                                                <Avatar boxSize={"30px"} src={user?.profile?.profilePicture?.secure_url} />
                                                <Text >{firstLetterCapital(user?.fullName)}</Text>
                                            </HStack>
                                            <Text textAlign={"left"} color={"gray"} noOfLines={1}>{user?.profile?.bio ? firstLetterCapital(user?.profile?.bio) : ""}</Text>
                                        </VStack>
                                    </PopoverBody>
                                    <PopoverFooter>
                                        <VStack
                                            gap={"-10px"} alignItems={"flex-start"} >
                                            {user?.role === "student" ? <Button

                                                fontWeight={"normal"}
                                                bgColor={"transparent"}
                                                _hover={{ bgColor: "transparent", textDecoration: "underline" }}
                                            ><Link to={"/profile"}>View Profile</Link></Button> : ""}
                                            <Button

                                                fontWeight={"normal"}
                                                bgColor={"transparent"}
                                                _hover={{ bgColor: "transparent", textDecoration: "underline" }}
                                                onClick={() => logOutHandler()}
                                                isLoading={isLoading}
                                                loadingText={"LoggingOut...."}

                                            >Logout</Button>
                                        </VStack>
                                    </PopoverFooter>
                                </PopoverContent>
                            </Portal>
                        </Popover>
                    }

                </HStack>
            </Box>

        </HStack>
    )
}

export default Navbar