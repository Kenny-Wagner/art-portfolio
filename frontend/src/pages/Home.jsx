import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Grid, Loader } from '@mantine/core';
import ArtCard from '../components/ArtCard';
import artService from '../services/artService';

const Home = () => {
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get('filter') || 'all';
  
  const filteredArt = () => {
    return filter === 'all' ? art : art.filter((piece) => piece.type === filter)
  }
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
        {filteredArt().map(piece => (
          <Grid.Col key={piece.id} span={4}>
            <ArtCard art={piece} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
