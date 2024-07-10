import React, { useEffect, useState } from 'react';
import { Container, Grid, Loader } from '@mantine/core';
import ArtPieceCard from '../components/ArtPieceCard';
import artService from '../services/artService';

const Home = () => {
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    artService.getArtPieces().then(response => {
      setArtPieces(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader size='xl' />;

  return (
    <Container>
      <Grid>
        {artPieces.map(artPiece => (
          <Grid.Col key={artPiece.id} span={4}>
            <ArtPieceCard artPiece={artPiece} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
