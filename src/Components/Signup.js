import React from 'react';
import Select from 'react-select';
import { useState } from 'react';
import { useSignup } from "../hooks/useSignup"
import sportsOptions from './sportsOptions';

import {
  Container,
  Stack,
  Heading,
  Text,
  Button,
  Link as ChakraLink,
  Box,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUser] = useState('');
  const [fullName, setName] = useState('');
  const [age, setAge] = useState('');
  const [sports, setSports] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    const validationErrors = [];

    if (!fullName.includes(' ')) {
      validationErrors.push('Full Name must include first name and last name separated by a space.');
    }
    
    if (userName.length < 5) {
      validationErrors.push('Username must be at least 5 characters.');
    }

    if (parseInt(age, 10) < 18 || isNaN(parseInt(age, 10))) {
      validationErrors.push('Age must be at least 18 and a valid number.');
    }

    // Password validation
    if (password.length < 8) {
      validationErrors.push('Password must be at least 8 characters.');
    }

    if (!/[A-Z]/.test(password)) {
      validationErrors.push('Password must contain at least one uppercase letter.');
    }

    if (!/[a-z]/.test(password)) {
      validationErrors.push('Password must contain at least one lowercase letter.');
    }

    if (!/\d/.test(password)) {
      validationErrors.push('Password must contain at least one digit.');
    }

    if(sports.length < 5) {
      validationErrors.push('Must choose at least 5 sports')
    }

    if (validationErrors.length > 0) {
      // Display all validation errors
      alert(validationErrors.join('\n'));
      return;
    }  

    // If no validation errors, proceed with signup
    await signup(email, password, userName, fullName, age, sports);
  };


  return (
    <ChakraProvider>
      <Container
        maxW="lg"
        py={{
          base: '12',
          md: '24',
        }}
        px={{
          base: '0',
          sm: '8',
        }}
      >
        <Stack spacing="8">
          <Flex
            direction="column"
            align="center"
          >
            <Heading
              size={{
                base: 'xs',
                md: 'lg',
              }}
              style={{
                textAlign: 'center',
                padding: '0px',
              }}
            >
              Sign up for an account
            </Heading>
            <Text color="muted">Have an Account?</Text>
            <ChakraLink as={Link} to="/login">
              <Button variant="link" colorScheme="black">
                Log in
              </Button>
            </ChakraLink>
          </Flex>
          <form onSubmit={handleSubmit}>
            <Box
              py={{
                base: '0',
                sm: '8',
              }}
              px={{
                base: '4',
                sm: '10',
              }}
              bg={{
                base: 'transparent',
                sm: 'bg-surface',
              }}
              boxShadow={{
                base: 'none',
                sm: 'md',
              }}
              borderRadius={{
                base: 'none',
                sm: 'xl',
              }}
            >
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="fullName">Full Name</FormLabel>
                    <Input
                      id="fullName"
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={fullName}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Instagram</FormLabel>
                    <Input
                      id="userName"
                      type="text"
                      onChange={(e) => setUser(e.target.value)}
                      value={userName}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="Age">Age</FormLabel>
                    <Input
                      id="age"
                      type="number"
                      onChange={(e) => setAge(e.target.value)}
                      value={age}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="sports">Sports You Play</FormLabel>
                    {console.log('Options:', sportsOptions)} {/* Add this line */}
                    <Select
                      id="sports"
                      options={sportsOptions}
                      isMulti
                      onChange={(selectedOptions) =>
                        setSports(selectedOptions.map((option) => option.value))
                      }
                    ></Select>
                  </FormControl>
                </Stack>
                <Divider />
                <Stack spacing="6">
                  <Button
                    variant="primary"
                    style={{
                      background: '#075985',
                      color: 'white',
                      margin: '10px',
                    }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    Sign up
                  </Button>
                  {error && <div className="error">{error}</div>}
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Container>
    </ChakraProvider>
  );
}

export default Signup;
