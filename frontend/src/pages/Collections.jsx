import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, SimpleGrid, Loader, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ArtCard from '../components/ArtCard';
import artService from '../services/artService';
import ArtModal from '../components/ArtModal';

const Collections = () => {
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [artpiece, setArtpiece] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);

  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get('filter') || 'all';
  const id = Number(queryParams.get('id')) || null;

  const filteredArt = () => {
    return filter === 'all' ? art : art.filter((piece) => piece.type.toLowerCase() === filter);
  };

  useEffect(() => {
    artService.getArt().then((response) => {
      setArt(response.data);
      setLoading(false);

      if (id) {
        const filteredPiece = response.data.find((piece) => piece.id === id);
        setArtpiece(filteredPiece);
        setTimeout(() => {
          open();
        }, 1);
      }
    });
  }, [id, open]);

  if (loading) return <Center><Loader size="xl" /></Center>;

  return (
    <Container py="xl">
      <SimpleGrid 
        cols={{ base: 2, lg: 3 }}>
          {filteredArt().map((piece) => (
            <ArtCard key={piece.id} art={piece} setArtpiece={setArtpiece} open={open} />
          ))}
      </SimpleGrid>
      <ArtModal artpiece={artpiece} opened={opened} close={close} />
    </Container>
  );
};

export default Collections;
