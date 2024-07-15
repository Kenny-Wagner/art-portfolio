import { useEffect, useState } from 'react';
import { Container, Grid, Loader } from '@mantine/core';
import ArtCard from '../components/ArtCard';
import artService from '../services/artService';

const Home = () => {
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    artService.getArt().then(response => {
      setArt(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader size='xl' />;

  return (
    <Container>
      <Grid>
        {art.map(piece => (
          <Grid.Col key={piece.id} span={4}>
            <ArtCard art={piece} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
