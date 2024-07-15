import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Text, TextInput, PasswordInput, Button } from '@mantine/core';
import authService from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    authService.register(username, password).then(() => {
      navigate('/login');
    });
  };

  return (
    <Container>
      <Text size="xl" weight={500} mt="md">Register</Text>
      <form onSubmit={handleRegister}>
        <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required mt="sm" />
        <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} required mt="sm" />
        <Button type="submit" mt="md">Register</Button>
      </form>
    </Container>
  );
};

export default Register;
