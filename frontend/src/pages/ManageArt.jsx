import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, Modal, TextInput, Textarea, NumberInput, Image, Loader } from '@mantine/core';
import artService from '../services/artService';
import ArtPieceCard from '../components/ArtPieceCard';

const ManageArt = () => {
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editing, setEditing] = useState(null);

  //const token = JSON.parse(localStorage.getItem('user')).token;

  useEffect(() => {
    artService.getArtPieces().then(response => {
      setArtPieces(response.data);
      setLoading(false);
    });
  }, []);

  const handleCreateOrUpdate = () => {
    const data = { title, description, price, imageUrl };
    if (editing) {
      artService.updateArtPiece(editing.id, data, token).then(() => {
        setArtPieces(artPieces.map(piece => piece.id === editing.id ? { ...piece, ...data } : piece));
        setEditing(null);
      });
    } else {
      artService.createArtPiece(data, token).then(response => {
        setArtPieces([...artPieces, response.data]);
      });
    }
    setOpened(false);
  };

  const handleDelete = (id) => {
    artService.deleteArtPiece(id, token).then(() => {
      setArtPieces(artPieces.filter(piece => piece.id !== id));
    });
  };

  if (loading) return <Loader size="xl" />;

  return (
    <Container>
      <Button onClick={() => setOpened(true)} mb="md">Add Art Piece</Button>
      <Grid>
        {artPieces.map(artPiece => (
          <Grid.Col key={artPiece.id} span={4}>
            <ArtPieceCard artPiece={artPiece} />
            <Button onClick={() => {
              setEditing(artPiece);
              setTitle(artPiece.title);
              setDescription(artPiece.description);
              setPrice(artPiece.price);
              setImageUrl(artPiece.imageUrl);
              setOpened(true);
            }} mt="sm">Edit</Button>
            <Button onClick={() => handleDelete(artPiece.id)} color="red" mt="sm">Delete</Button>
          </Grid.Col>
        ))}
      </Grid>
      <Modal opened={opened} onClose={() => setOpened(false)} title={editing ? "Edit Art Piece" : "Add Art Piece"}>
        <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <NumberInput label="Price" value={price} onChange={(val) => setPrice(val)} required />
        <TextInput label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <Button onClick={handleCreateOrUpdate} mt="md">{editing ? "Update" : "Create"}</Button>
      </Modal>
    </Container>
  );
};

export default ManageArt;
