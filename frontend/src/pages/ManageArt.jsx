import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Center, Grid, Group, Button, FileButton,
   Modal, Text, TextInput, Textarea, NumberInput, Loader } from '@mantine/core';
import artService from '../services/artService';
import ArtCard from '../components/ArtCard';

const ManageArt = ({user}) => {
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  const navigate = useNavigate()

  useEffect(() => {
    artService.getArt().then(response => {
      setArt(response.data);
      setLoading(false);
    });
  }, []);

  const clearModal = () => {
    if (editing) {
        setEditing(false);
        setEditing('');
    }
    setOpened(false);
    setTitle('');
    setDescription('');
    setPrice('');
    setImageUrl('');
  }

  const handleCreateOrUpdate = () => {
    const data = { title, description, price, imageUrl };
    if (editing) {
      artService.updateArt(editing.id, data).then(() => {
        setArt(art.map(piece => piece.id === editing.id ? { ...piece, ...data } : piece));
        setEditing(null);
      });
    } else {
      artService.createArt(data).then(response => {
        setArt([...art, response.data]);
      });
    }
    setOpened(false);
    clearModal()
  };

  const handleConfirmDelete = () => {
    if (deleting) {
      artService.deleteArt(deleting.id).then(() => {
        setArt(art.filter(piece => piece.id !== deleting.id));
        setDeleting(null);
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleting(null);
  };

  if (loading) return <Loader size="xl" />;

  if (!user?.isAdmin){
    navigate('/')
  }

  return (
    <Container>
      <Center  mt="md">
        <Button onClick={() => setOpened(true)} mb="md">Add Art</Button> 
      </Center>
      <Grid>
        {art.map(artPiece => (
          <Grid.Col key={artPiece.id} span={4}>
            <ArtCard art={artPiece} />
            <Button onClick={() => {
              setEditing(artPiece);
              setTitle(artPiece.title);
              setDescription(artPiece.description);
              setPrice(artPiece.price);
              setImageUrl(artPiece.imageUrl);
              setOpened(true);
            }} mt="sm">Edit</Button>
            <Button onClick={() => setDeleting(artPiece)} color="red" mt="sm">Delete</Button>
          </Grid.Col>
        ))}
      </Grid>
      <Modal opened={opened} onClose={clearModal} title={editing ? "Edit Art" : "Add Art"}>
        <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <NumberInput label="Price" value={price} onChange={(val) => setPrice(val)} required />
        <TextInput label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <Button onClick={handleCreateOrUpdate} mt="md">{editing ? "Update" : "Create"}</Button>
      </Modal>
      <Modal opened={deleting}  withCloseButton={false} closeOnClickOutside={false} centered={true} size="md">
        <Text size="xl" ta="center">Delete {deleting?.title}?</Text>
        <Group justify="center" mt="lg">
          <Button variant="filled" color="red" onClick={handleConfirmDelete}>Delete</Button>
          <Button variant="filled" color="gray" onClick={handleCancelDelete}>Cancel</Button>  
        </Group>
      </Modal>
            
    </Container>
  );
};

export default ManageArt;
