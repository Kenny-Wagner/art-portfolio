import {React, useState, useEffect } from 'react';
import { Container, Paper, Text, Title, Image, Grid, Button, Group, Stack, Flex, Box } from '@mantine/core';
import artService from '../services/artService'

const ArtPaper = ({art}) => {
  return (
    <Paper style={{ border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '16px', borderRadius: '8px', maxWidth: '400px' }}>
    <Flex>
      <Image
        src={art.imageUrl}
        alt={art.title}
        width={150}
        height={150}
        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        radius="md"
      />
      <Stack spacing="xs" style={{ marginLeft: '16px', flexGrow: 1 }}>
        <Text align="left" style={{ color: 'purple', fontWeight: 'bold' }}>{art.title}</Text>
        <Text align="left" style={{ color: 'purple' }}>July 2024</Text>
        <Text align="left" style={{ color: 'purple' }}>SOLD! at $3</Text>
      </Stack>
    </Flex>
    <Box mt="md">
      <Button fullWidth color="blue" style={{ backgroundColor: 'red' }}>
        View in Collection
      </Button>
    </Box>
  </Paper>
  )
}

const About = () => {
  const [art, setArt] = useState([])

  useEffect(() => {
    artService.getArt().then(response => {
      setArt(response.data);
    });
  }, []);

  return (
    <Container>
      <Paper style={{ border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '16px', marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Image
            src={`${import.meta.env.VITE_BACKEND_URL}/rose_nonprofessional.jpg`}
            alt="Profile"
            width={100}
            height={100}
            radius="md"
            style={{ marginRight: '16px' }} // Add some margin to space out the image from the text
          />
          <div>
            <Title order={2}>About Me!</Title>
            <Text mt="sm">
              Rose was born in Cape May NJ before moving to Sicklerville, NJ and attended Timber Creek High School, graduating in 2017. She currently resides in Collingswood.
              Rose is currently a mortuary student attending Mercer County community college, on the path of becoming a funeral director while she completes her internship with us. She previously attended Rowan University, pursuing a degree in Biomedical Art and Visualization. At Rowan she found her passion in anatomy and physiology as well as forensic reconstruction. She enjoys painting and constructing ceramics in her spare time.
              Every summer Rose volunteers at a Fair in Jackson, NJ where she offers craft activities and face painting to raise money for children with cancer. She also volunteers at a handful of other charitable events throughout the year.
            </Text>
          </div>
        </div>
      </Paper>
      <Paper style={{ border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '16px', marginTop: '16px' }}>
        <Title order={3} align="center">You may have seen me at:</Title>
        <Text align="center">Otakon Art Show/Auction 2024</Text>
      </Paper>

      <Grid mt="md" grow>
        {art.map((piece) => (
                <Grid.Col span={4} key={piece.id} >
                  <ArtPaper art={piece}/>
                </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
