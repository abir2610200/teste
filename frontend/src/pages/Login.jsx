import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Link,
  Text,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { FaInfinity } from 'react-icons/fa';

function Login({ setIsAuthenticated }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [beamDegrees, setBeamDegrees] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    setBeamDegrees((prev) => prev + 45);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email and password are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      const url = 'http://localhost:5000/api/auth/login';
      const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { message, token, error, role, userId } = result;
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
        if (role === "admin") {
          localStorage.setItem("adminId", userId);
        }
        setIsAuthenticated(true);
        toast({
          title: "Login successful!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate('/home');
      } else {
        toast({
          title: "Error",
          description: error?.details?.[0]?.message || message || "Login failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      let errorMessage = "An unexpected error occurred";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction={['column', 'row']} minH="100vh">
      {/* Left Section: Form */}
      <Flex flex="1" align="center" justify="center" p={8}>
        <Box w="full" maxW="md">
          <Flex align="center" mb={6}>
            <Icon as={FaInfinity} w={8} h={8} mr={2} />
            <Text fontSize="2xl" fontWeight="bold">Logo</Text>
          </Flex>
          <Heading mb={4}>Sign into your account</Heading>
          <form onSubmit={handleLogin}>
            <VStack spacing={4} align="stretch">
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={loginInfo.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Box position="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={loginInfo.password}
                    onChange={handleChange}
                  />
                  <Button
                    size="sm"
                    position="absolute"
                    right="4px"
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                  {/* Decorative light beam */}
                  <Box
                    position="absolute"
                    top="100%"
                    left="0"
                    width="100%"
                    height="2px"
                    bg="blue.400"
                    mt={2}
                    transform={`rotate(${beamDegrees}deg)`}
                  />
                </Box>
              </FormControl>
              <Button type="submit" colorScheme="blue" w="full">
                LOGIN
              </Button>
            </VStack>
          </form>
          <HStack justify="space-between" mt={4}>
            <Link as={RouterLink} to="/forgot-password" color="blue.500">
              Forgot password?
            </Link>
            <Text>
              Don't have an account?{' '}
              <Link as={RouterLink} to="/register" color="blue.500">
                Register here
              </Link>
            </Text>
          </HStack>
          <HStack spacing={2} mt={4}>
            <Link as={RouterLink} to="/terms" color="blue.500">
              Terms of use
            </Link>
            <Text>.</Text>
            <Link as={RouterLink} to="/privacy" color="blue.500">
              Privacy policy
            </Link>
          </HStack>
        </Box>
      </Flex>

      {/* Right Section: Image */}
      <Flex flex="1" display={['none', 'flex']}>
        <Box
          backgroundImage="url('https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1000&auto=format&fit=crop')"
          backgroundSize="cover"
          backgroundPosition="center"
          w="100%"
        />
      </Flex>
    </Flex>
  );
}

export default Login;
