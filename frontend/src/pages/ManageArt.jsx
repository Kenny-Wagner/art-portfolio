import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Group, Button, Modal, Text, TextInput, Textarea, NumberInput, Loader } from '@mantine/core';
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
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    artService.getArtPieces().then(response => {
      setArtPieces(response.data);
      setLoading(false);
    });
  }, []);

  const clearEditModal = () => {
    setEditing(false); 
    setOpened(false);
    setEditing('');
    setTitle('');
    setDescription('');
    setPrice('');
    setImageUrl('');
  }

  const handleCreateOrUpdate = () => {
    const data = { title, description, price, imageUrl };
    if (editing) {
      artService.updateArtPiece(editing.id, data).then(() => {
        setArtPieces(artPieces.map(piece => piece.id === editing.id ? { ...piece, ...data } : piece));
        setEditing(null);
      });
    } else {
      artService.createArtPiece(data).then(response => {
        setArtPieces([...artPieces, response.data]);
      });
    }
    setOpened(false);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpened(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      artService.deleteArtPiece(deleteId).then(() => {
        setArtPieces(artPieces.filter(piece => piece.id !== deleteId));
        setDeleteId(null);
        setDeleting(false);
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setDeleting(false);
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
            <Button onClick={() => setDeleting(true)} color="red" mt="sm">Delete</Button>
          </Grid.Col>
        ))}
      </Grid>
      <Modal opened={opened} onClose={clearEditModal} title={editing ? "Edit Art Piece" : "Add Art Piece"}>
        <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <NumberInput label="Price" value={price} onChange={(val) => setPrice(val)} required />
        <TextInput label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <Button onClick={handleCreateOrUpdate} mt="md">{editing ? "Update" : "Create"}</Button>
      </Modal>
      <Modal opened={deleting}  withCloseButton={false} centered={true} size="md">
        <Text size="xl" ta="center">Delete art?</Text>
        <Group justify="center" mt="lg">
          <Button variant="filled" color="red" onClick={handleConfirmDelete}>Delete</Button>
          <Button variant="filled" color="gray" onClick={handleCancelDelete}>Cancel</Button>  
        </Group>
      </Modal>
            
    </Container>
  );
};

export default ManageArt;
