import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { commitMutation } from "relay-runtime";
import { Navigate } from "react-router-dom";
import RelayEnvironment from "../graphql/environment";
import { CreateUserMutation } from "../graphql/mutations";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    sending: false,
    success: false,
  });

  function submit(e) {
    e.preventDefault();
    setFormData({ ...formData, sending: false });

    if (formData.password !== formData.confirmPassword) {
      alert("The confirmation password does not match.");
      setFormData({ ...formData, sending: true });
    } else {
      commitMutation(RelayEnvironment, {
        mutation: CreateUserMutation,
        variables: {
          payload: { email: formData.email, password: formData.password },
        },
        onError: (error) => {
          setFormData({ ...formData, sending: false });
          alert("Error: " + JSON.stringify(error.source));
        },
        onCompleted: (response, errors) => {
          if (errors.length) {
            const error = errors[0];
            setFormData({ ...formData, sending: false });
            alert("Error: " + error.message);
          } else {
            setFormData({ ...formData, success: true });
          }
        },
      });
    }
  }

  return (
    <Container>
      {formData.success && <Navigate to={"/login"} />}
      <Flex alignItems={"center"} justifyContent={"center"} height={"100vh"}>
        <Box>
          <Heading>Register</Heading>
          <Text margin={"10px 0"}>
            Create your account and personalize your profile.
          </Text>

          <form onSubmit={submit}>
            <FormControl marginTop={"30px"}>
              <FormLabel>Email Address:</FormLabel>
              <Input
                required
                placeholder={"you@example.com"}
                type={"email"}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>

            <FormControl marginTop={"10px"}>
              <FormLabel>Password:</FormLabel>
              <Input
                required
                placeholder={"********"}
                type={"password"}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              <FormHelperText>
                Try not to use a password that you use on another website.
              </FormHelperText>
            </FormControl>

            <FormControl marginTop={"10px"}>
              <FormLabel>Confirm Password:</FormLabel>
              <Input
                required
                placeholder={"********"}
                type={"password"}
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                }}
              />
            </FormControl>

            <FormControl marginTop={"20px"}>
              <Button type="submit" disabled={formData.sending}>
                Register
              </Button>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </Container>
  );
}
