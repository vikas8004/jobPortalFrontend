import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    HStack,
    VStack,

    useToast,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { userBaseUrl } from "../utils/constants.jsx";
import { setUser } from "../features/authFeatures.js"
import axios from 'axios'
axios.defaults.withCredentials = true;
const UpdateProfileDialog = ({ onClose, isOpen }) => {
    const toast = useToast()
    const cancelRef = useRef();
    const fileRef = useRef();
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth)
    const [input, setInput] = useState({
        fullName: user?.fullName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.join(","),
        resume: null

    })
    const onchangeHandler = (e) => {
        setInput((prevInp) => {
            return {
                ...prevInp,
                [e.target.name]: e.target.value
            }
        })
    }
    const onUpdate = async (value) => {
        try {
            const updateData = new FormData();
            updateData.append("fullName", value.fullName)
            updateData.append("email", value.email)
            updateData.append("phoneNumber", value.phoneNumber)
            updateData.append("bio", value.bio)
            updateData.append("skills", value.skills)
            updateData.append("resume", value.resume)
            const res = await axios.post(`${userBaseUrl}/profile/update`, updateData);
            if (res) {

                return res.data;

            }
        } catch (error) {
            toast({
                duration: 3000,
                status: 'error',
                isClosable: true,
                position: "top-right",
                description: error.response.data.message
            })

            throw new Error(error)
        }

    }
    // using usemutation
    const { mutate, isLoading } = useMutation(onUpdate, {
        onSuccess: (data) => {

            // console.log(data);
            setInput({
                fullName: "",
                email: "",
                phoneNumber: "",
                bio: "",
                skills: "",
                resume: null
            })
            fileRef.current.value = null;
            dispatch(setUser(data.data.derivedUser))
            toast({
                duration: 3000,
                status: 'success',
                isClosable: true,
                position: "top-right",
                description: data.data.message
            })
            onClose()

        },
        onError: (error) => {
            console.log(error);


        }
    })
    const onSubmit = () => {
        mutate(input)
    }
    return (
        <AlertDialog
            motionPreset='slideInBottom'
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            closeOnOverlayClick={false}
            isOpen={isOpen}
            isCentered
        >
            <AlertDialogOverlay clos />

            <AlertDialogContent width={"90%"}>
                <AlertDialogHeader>Update Profile?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    <VStack>
                        <FormControl>
                            <HStack>
                                <FormLabel fontWeight={"bold"} width={"20%"}>Name</FormLabel>
                                <Input width={"80%"} borderColor={"black"}
                                    name='fullName'
                                    value={input.fullName}
                                    onChange={onchangeHandler}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <HStack>
                                <FormLabel fontWeight={"bold"} width={"20%"}>Email</FormLabel>
                                <Input width={"80%"} borderColor={"black"}
                                    name='email'
                                    value={input.email}
                                    onChange={onchangeHandler}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <HStack>
                                <FormLabel fontWeight={"bold"} width={"20%"}>Number</FormLabel>
                                <Input width={"80%"} borderColor={"black"}
                                    name='phoneNumber'
                                    value={input.phoneNumber}
                                    onChange={onchangeHandler}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <HStack>
                                <FormLabel fontWeight={"bold"} width={"20%"}>Bio</FormLabel>
                                <Input width={"80%"} borderColor={"black"}
                                    name='bio'
                                    value={input.bio}
                                    onChange={onchangeHandler}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <HStack>
                                <FormLabel fontWeight={"bold"} width={"20%"}>Skills</FormLabel>
                                <Input width={"80%"} borderColor={"black"}
                                    name='skills'
                                    value={input.skills}
                                    onChange={onchangeHandler}
                                />
                            </HStack>
                        </FormControl>
                        <FormControl>
                            <HStack>
                                <FormLabel fontWeight={"bold"} width={"20%"}>Resume</FormLabel>
                                <Input width={"80%"} borderColor={"black"} type='file' accept='application/pdf'
                                    name='resume'
                                    onChange={(e) => {
                                        let file = e.target.files[0]
                                        setInput({ ...input, resume: file })
                                    }}
                                    ref={fileRef}
                                />
                            </HStack>
                        </FormControl>
                    </VStack>
                </AlertDialogBody>
                <AlertDialogFooter>

                    <Button
                        onClick={() => onSubmit()}
                        bgColor={"black"} color={"white"} _hover={{ bgColor: "black" }} ml={3}
                        isLoading={isLoading}
                        loadingText={"updting..."}
                        isDisabled={!input.bio && !input.email && !input.fullName && !input.phoneNumber && !input.resume && !input.skills}
                    >
                        Update
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default UpdateProfileDialog