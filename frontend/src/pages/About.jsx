import { React, useState, useEffect } from 'react';
import { Container, Paper, Text, Title, Image, Grid, Button, Group, Stack, Flex, Box } from '@mantine/core';
import artService from '../services/artService';
import classes from './About.module.css'; // Import the CSS module

const ArtPaper = ({ art }) => {
  return (
    <Paper className={classes.artPaper}>
      <Flex>
        <Image
          src={art.imageUrl}
          alt={art.title}
          width={150}
          height={150}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          radius="md"
        />
        <Stack spacing="xs" className={classes.artInfo}>
          <Text className={classes.artTitle}>{art.title}</Text>
          <Text className={classes.artDate}>July 2024</Text>
          <Text className={classes.artPrice}>SOLD! at $3</Text>
        </Stack>
      </Flex>
      <Box mt="md">
        <Button fullWidth className={classes.viewButton}>
          View in Collection
        </Button>
      </Box>
    </Paper>
  );
};

const About = () => {
  const [art, setArt] = useState([]);

  useEffect(() => {
    artService.getArt().then((response) => {
      setArt(response.data);
    });
  }, []);

  return (
    <Container>
      <Paper className={classes.aboutPaper}>
        <div className={classes.profileContainer}>
          <Image
            src='https://tibialrose.s3.us-east-2.amazonaws.com/public/images/cat.webp'
            alt="Profile"
            width={100}
            height={100}
            radius="md"
            className={classes.profileImage}
          />
          <div>
            <Title order={2}>About Me!</Title>
            <Text mt="sm" className={classes.aboutText}>
              Rose was born in Cape May NJ before moving to Sicklerville, NJ and attended Timber Creek High School, graduating in 2017. She currently resides in Collingswood.
              Rose is currently a mortuary student attending Mercer County community college, on the path of becoming a funeral director while she completes her internship with us. She previously attended Rowan University, pursuing a degree in Biomedical Art and Visualization. At Rowan she found her passion in anatomy and physiology as well as forensic reconstruction. She enjoys painting and constructing ceramics in her spare time.
              Every summer Rose volunteers at a Fair in Jackson, NJ where she offers craft activities and face painting to raise money for children with cancer. She also volunteers at a handful of other charitable events throughout the year.
            </Text>
          </div>
        </div>
      </Paper>
      <Paper className={classes.eventPaper}>
        <Title order={3} align="center">You may have seen me at:</Title>
        <Text align="center">Otakon Art Show/Auction 2024</Text>
      </Paper>

      <Grid mt="md">
        {art.map((piece) => (
          <Grid.Col span={4} key={piece.id}>
            <ArtPaper art={piece} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
