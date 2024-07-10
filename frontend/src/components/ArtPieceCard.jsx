import React from 'react';
import { Card, Image, Text, Button } from '@mantine/core';


const ArtPieceCard = ({ artPiece }) => {

  const tempImgUrl = artPiece.imageUrl.replace('http://localhost:5000', import.meta.env.VITE_BACKEND_URL)

  return (
    <Card shadow="sm" padding="lg">
      <Card.Section>
        <Image src={tempImgUrl} height={160} alt={artPiece.title} />
      </Card.Section>

      <Text weight={500} size="lg" mt="md">{artPiece.title}</Text>
      <Text mt="sm">{artPiece.description}</Text>
      <Text weight={700} size="xl" mt="md">${artPiece.price}</Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Buy Now
      </Button>
    </Card>
  );
};

export default ArtPieceCard;
