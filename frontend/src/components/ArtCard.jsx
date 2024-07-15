import { Card, Image, Text, Button } from '@mantine/core';


const ArtCard = ({ art }) => {

  const tempImgUrl = art.imageUrl.replace('http://localhost:5000', import.meta.env.VITE_BACKEND_URL)

  return (
    <Card shadow="sm" padding="lg">
      <Card.Section>
        <Image src={tempImgUrl} height={160} alt={art.title} />
      </Card.Section>

      <Text weight={500} size="lg" mt="md">{art.title}</Text>
      <Text mt="sm">{art.description}</Text>
      <Text weight={700} size="xl" mt="md">${art.price}</Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Buy Now
      </Button>
    </Card>
  );
};

export default ArtCard;
