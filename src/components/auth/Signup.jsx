import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, Radio, RadioGroup, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import axios from "axios"
import { Field, Form, Formik } from "formik"
import React, { useRef, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

import { userBaseUrl } from "../../utils/constants.jsx"
import Navbar from '../Navbar'
axios.defaults.withCredentials = true;
const Signup = () => {
    const toast = useToast()
    const [showPassword, setShowPassword] = useState(false);
    const fileRef = useRef("")
    const navigate = useNavigate()
    const initialValues = {
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "",
        profilePicture: ""
    }
    const validationSchema = Yup.object({
        fullName: Yup.string().min(3, "Name must contain minimum 3 letters").required("Fullname is required"),
        email: Yup.string().matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please enter a valid email"
        ).required("Email is required"),
        phoneNumber: Yup.string().matches(
            /^[6-9]\d{9}$/,
            "Please enter a valid Indian phone number"
        ).required("Phone number is required"),
        password: Yup.string().min(4, "Min 4 characters").required("Required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required"),
        role: Yup.string().required("Role is required"),
        profilePicture: Yup.mixed().required("Profile picture is required")
    })

    const postData = async ({ values, resetForm }) => {

        try {
            // console.log(values);
            const formData = new FormData()
            formData.append("fullName", values.fullName)
            formData.append("phoneNumber", values.phoneNumber)
            formData.append("password", values.password)
            formData.append("email", values.email)
            formData.append("role", values.role)
            formData.append("profilePicture", values.profilePicture)
            let res = await axios.post(`${userBaseUrl}/register`, formData)
            if (res) {
                fileRef.current.value = null;
                toast({
                    status: "success",
                    description: "Regestration successful",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right"
                })
                resetForm()

                return res.data
            }

            resetForm()
        } catch (error) {
            toast({
                status: "error",
                isClosable: true,
                duration: 3000,
                description: error.response.data.message,
                position: "top-right"
            })
            throw new Error(error)

        }
    }
    // using useMutation
    const { mutate, isLoading } = useMutation(postData, {
        onSuccess: () => {
            navigate("/login")

        },
        onError: (err) => {
            console.log(err);
        }
    })
    const onSubmit = (values, { resetForm }) => {

        mutate({ values, resetForm })

    }
    const handleImageChange = (e, setFieldValue, setFieldError) => {
        const file = e.target.files[0];
        if (file) {

            setFieldValue("profilePicture", file)
            setFieldError("profilePicture", "")
        } {
            setFieldError("profilePicture", "Profile picture is required")
        }

    }

    return (
        <>
            <VStack alignItems={"flex-start"}  >
                <Navbar />
                <VStack px={["0px", "20px", '40px', "70px"]} w={"full"} my={"30px"}>
                    <VStack rounded={"6px"}
                        width={["95%", "80%", "70%", "60%"]}
                        border={"2px"} borderColor={"gray.200"} alignItems={"center"}  >
                        <Heading as={"h1"} fontWeight={"bold"} fontSize={"x-large"} mt={"10px"}>Sign Up</Heading>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                            {({ errors, touched, setFieldValue, setFieldError, setFieldTouched }) => (
                                <Form style={{ width: "82%" }}>
                                    <FormControl isInvalid={errors.fullName && touched.fullName}>
                                        <FormLabel>
                                            Full Name
                                        </FormLabel>
                                        <Field
                                            as={Input}
                                            name="fullName"
                                            placeholder="Enter fullname"

                                        />
                                        <FormErrorMessage>{errors.fullName}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.email && touched.email}>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <Field
                                            as={Input}
                                            type="email"
                                            name={"email"}
                                            placeholder="Enter email"
                                        />
                                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.phoneNumber && touched.phoneNumber}>
                                        <FormLabel>
                                            Phone Number
                                        </FormLabel>
                                        <Field
                                            as={Input}
                                            placeholder={"Enter phone number"}
                                            name="phoneNumber"
                                        />
                                        <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl

                                        isInvalid={errors.password && touched.password}
                                    >
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <InputGroup>
                                            <Field
                                                name="password"
                                                as={Input}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"

                                            />
                                            <InputRightElement width="4.5rem">
                                                <Button
                                                    h="1.75rem"
                                                    size="sm"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        {errors.password && touched.password ? (
                                            <Text color="red.500">{errors.password}</Text>
                                        ) : null}
                                    </FormControl>
                                    <FormControl

                                        isInvalid={
                                            errors.confirmPassword && touched.confirmPassword
                                        }
                                    >
                                        <FormLabel>
                                            Confirm Password
                                        </FormLabel>
                                        <InputGroup>
                                            <Field
                                                name="confirmPassword"
                                                as={Input}
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Confirm Password"

                                            />
                                            <InputRightElement width="4.5rem">
                                                <Button
                                                    h="1.75rem"
                                                    size="sm"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        {errors.confirmPassword && touched.confirmPassword ? (
                                            <Text color="red.500">
                                                {errors.confirmPassword}
                                            </Text>
                                        ) : null}
                                    </FormControl>
                                    <FormControl
                                        as="fieldset"
                                        isInvalid={errors.role && touched.role}
                                        mb={4}
                                    >
                                        <FormLabel as="legend">Select Your Role</FormLabel>
                                        <Field name="role">
                                            {({ field }) => (
                                                <RadioGroup
                                                    {...field}
                                                    onChange={(value) => setFieldValue("role", value)}
                                                >
                                                    <Stack direction="row">
                                                        <Radio colorScheme='green' value="student">Student</Radio>
                                                        <Radio colorScheme='green' value="recruiter">Recruiter</Radio>
                                                    </Stack>
                                                </RadioGroup>
                                            )}
                                        </Field>
                                        <FormErrorMessage>{errors.role}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={errors.profilePicture && touched.profilePicture}>
                                        <FormLabel>
                                            Profile Picture
                                        </FormLabel>
                                        <Input ref={fileRef} type='file' accept='image/*' onChange={(e) => {
                                            setFieldTouched("profilePicture", true)
                                            handleImageChange(e, setFieldValue, setFieldError)
                                        }} />
                                        <FormErrorMessage>{errors.profilePicture}</FormErrorMessage>
                                    </FormControl>

                                    <Button type='submit' width={"full"} my={"20px"} isLoading={isLoading} loadingText={"Submitting..."} bgColor={"black"} color={"white"} _hover={{ bgColor: "black" }}>Submit</Button>
                                </Form>
                            )}
                        </Formik>
                        <Box mt={"-20px"} mb={"20px"} width={"80%"} display={"flex"} justifyContent={"right"}><Text>Already have an account? <Box as='span' color={"blue"} cursor={"pointer"} onClick={() => { navigate("/login") }}>Login</Box></Text></Box>
                    </VStack>
                </VStack>
            </VStack>
        </>
    )
}

export default Signup