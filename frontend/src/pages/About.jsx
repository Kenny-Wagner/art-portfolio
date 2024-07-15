import { Container, Text, Image } from '@mantine/core';

const About = () => {
  return (
    <Container>
      <Image   
        height={300}
        src={ `${import.meta.env.VITE_BACKEND_URL}/jackie.jpg` } alt="Artist" 
      />
      <Text size="xl" weight={500} mt="md">About the Artist</Text>
      <Text mt="sm">
        Jackie is a good artist
      </Text>
    </Container>
  );
};

export default About;
