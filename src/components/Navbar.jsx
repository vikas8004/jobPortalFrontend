import { Avatar, Box, Button, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Text, useToast, VStack } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useMutation } from 'react-query'
import { userBaseUrl } from '../utils/constants.jsx';
import { setUser } from '../features/authFeatures.js'
import firstLetterCapital from '../utils/makeFirstLetterCapital.jsx'
axios.defaults.withCredentials = true

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        mutate()
    }
    return (
        <HStack as={"div"} display={"flex"} width={"full"} justifyContent={"space-between"} px={"70"} mt={"3px"}
            height={"40px"} zIndex={99}>
            <Box><Text fontSize={"larger"} fontWeight={"bolder"}>Job<Box as='span' color={"#F83002"}>Portal</Box></Text></Box>
            <HStack gap={"30px"}>
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
                                <li><Link to={"/jobs"}>Jobs</Link></li>
                                <li><Link to={"/browse"}>Browse</Link></li></>
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
        </HStack>
    )
}

export default Navbar