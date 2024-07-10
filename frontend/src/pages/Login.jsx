import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Text, TextInput, PasswordInput, Button } from '@mantine/core';
import authService from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    authService.login(username, password).then(() => {
      navigate('/');
    });
  };

  return (
    <Container>
      <Text size="xl" weight={500} mt="md">Login</Text>
      <form onSubmit={handleLogin}>
        <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required mt="sm" />
        <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required mt="sm" />
        <Button type="submit" mt="md">Login</Button>
      </form>
    </Container>
  );
};

export default Login;
