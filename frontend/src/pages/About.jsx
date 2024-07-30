import { React, useState, useEffect } from 'react';
import { Container, Paper, Text, Title, Image, Grid, Button, Group, Stack, Flex, Box } from '@mantine/core';
import artService from '../services/artService';
import classes from './About.module.css'; // Import the CSS module
import ArtCarousel from '../components/ArtCarousel'

const About = () => {
  const [art, setArt] = useState([]);

  useEffect(() => {
    artService.getArt().then((response) => {
      const filteredArt = response.data.filter((art) => art.type !== 'animation' && art.sold === true)
      setArt(filteredArt);
    });
  }, []);

  return (
    <Container>
      <Paper className={classes.aboutPaper}>
        <div className={classes.profileContainer}>
          <Image
            src={`${import.meta.env.VITE_BACKEND_URL}/about.jpg`}
            alt="Profile"
            width={125}
            height={125}
            radius="md"
            className={classes.profileImage}
          />
          <div>
            <Title order={2}>About Me!</Title>
            <Text mt="sm" className={classes.aboutText}>
              Rose was born in Cape May NJ before moving to Sicklerville, NJ and attended Timber Creek High School, graduating in 2017. She currently resides in Collingswood.
              Rose is currently a mortuary student attending Mercer County community college, on the path of becoming a funeral director while she completes her internship with us. 
            </Text>
          </div>
        </div>
      </Paper>
      <Paper className={classes.eventPaper}>
        <Title order={3} align="center">You may have seen me at:</Title>
        <Text align="center">Otakon Art Exhibit 2024</Text>
      </Paper>
      <ArtCarousel className={classes.artCarosuel} art={art} /> 
    </Container>
  );
};

export default About;
