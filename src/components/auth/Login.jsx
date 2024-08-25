import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, InputGroup, InputRightElement, Radio, RadioGroup, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import { Field, Form, Formik } from "formik"
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import Navbar from '../Navbar'
import { useMutation } from 'react-query'
import axios from 'axios'
import { userBaseUrl } from '../../utils/constants.jsx'
import {useDispatch} from 'react-redux'
import { setUser } from '../../features/authFeatures.js'
axios.defaults.withCredentials = true


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const toast = useToast();
  const dispatch=useDispatch()
  const initialValues = {
    email: "",
    password: "",
    role: "",
  }
  const validationSchema = Yup.object({

    email: Yup.string().matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    ).required("Email is required"),
    password: Yup.string().min(4, "Min 4 characters").required("Required"),
    role: Yup.string().required("Role is required"),

  })

  // signning funcion
  const sinningIn = async ({ values }) => {
    try {
      const res = await axios.post(`${userBaseUrl}/login`, values)
      if (res) {
        toast({
          description: res.data.data.message,
          isClosable: true,
          position: "top-right",
          duration: 3000,
          status: "success"
        })
        return res.data
      }
    } catch (error) {
      toast({
        description: error.response.data.message,
        isClosable: true,
        position: "top-right",
        duration: 3000,
        status: "error"
      })
      throw new Error(error);
    }
  }
  // using useMutation
  const { mutate, isLoading } = useMutation(sinningIn, {
    onSuccess: (data) => {
      // console.log(data);
      dispatch(setUser(data.data.user))
      navigate("/")

    },
    onError: (err) => {
      console.log(err);

    }
  })
  const onSubmit = async (values, { resetForm }) => {

    mutate({ values })
  }


  return (
    <>
      <VStack alignItems={"flex-start"}  >
        <Navbar />
        <VStack px={["0px", "20px", '40px', "70px"]} w={"full"} my={"30px"}>
          <VStack rounded={"6px"}
            width={["95%", "80%", "70%", "60%"]}
            border={"2px"} borderColor={"gray.200"} alignItems={"center"}  >
            <Heading as={"h1"} fontWeight={"bold"} fontSize={"x-large"} mt={"10px"}>Log In</Heading>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
              {({ errors, touched, isSubmitting, setFieldValue }) => (
                <Form style={{ width: "82%" }}>

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


                  <Button type='submit' width={"full"} my={"20px"} isLoading={isLoading} loadingText={"Submitting..."} bgColor={"black"} color={"white"} _hover={{ bgColor: "black" }}>Submit</Button>
                </Form>
              )}
            </Formik>
            <Box mt={"-20px"} mb={"20px"} width={"80%"} display={"flex"} justifyContent={"right"}><Text>Don't have an account? <Box as='span' color={"blue"} cursor={"pointer"} onClick={() => { navigate("/signup") }}>Signup</Box></Text></Box>
          </VStack>
        </VStack>
      </VStack>
    </>
  )
}

export default Login