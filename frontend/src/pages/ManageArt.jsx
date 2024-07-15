import { useEffect, useState } from 'react';
import { Container, Center, Grid, Group, Button, Modal, Text, TextInput, Textarea, NumberInput, Loader } from '@mantine/core';
import artService from '../services/artService';
import ArtCard from '../components/ArtCard';

const ManageArt = () => {
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    artService.getArt().then(response => {
      setArt(response.data);
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
      <Center  mt="md">
        <Button onClick={() => setOpened(true)} mb="md">Add Art</Button> 
      </Center>
      <Grid>
        {art.map(art => (
          <Grid.Col key={art.id} span={4}>
            <ArtCard art={art} />
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
      <Modal opened={opened} onClose={clearEditModal} title={editing ? "Edit Art" : "Add Art"}>
        <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <NumberInput label="Price" value={price} onChange={(val) => setPrice(val)} required />
        <TextInput label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <Button onClick={handleCreateOrUpdate} mt="md">{editing ? "Update" : "Create"}</Button>
      </Modal>
      <Modal opened={deleting}  withCloseButton={false} closeOnClickOutside={false} centered={true} size="md">
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
