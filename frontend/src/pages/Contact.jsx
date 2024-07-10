import React from 'react';
import { Container, Text, TextInput, Textarea, Button } from '@mantine/core';

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <Container>
      <Text size="xl" weight={500} mt="md">Contact</Text>
      <form onSubmit={handleSubmit}>
        <TextInput label="Name" placeholder="Your name" required mt="sm" />
        <TextInput label="Email" placeholder="Your email" required mt="sm" />
        <Textarea label="Message" placeholder="Your message" required mt="sm" />
        <Button type="submit" mt="md">Send</Button>
      </form>
    </Container>
  );
};

export default Contact;
