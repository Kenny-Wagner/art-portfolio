import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Center, SimpleGrid, Group, Button, FileButton,
   Modal, Text, TextInput, Textarea, NumberInput, Loader, Progress, Stack  } from '@mantine/core';
import artService from '../services/artService';
import imageService from '../services/imageService';
import ArtCard from '../components/ArtCard';

const ManageArt = ({user}) => {
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [file, setFile] = useState(null);
  const [fileLink, setFileLink] = useState('')
  const [uploadProgress, setUploadProgress] = useState(0);
  const resetRef = useRef(null);

  const clearFile = () => {
    setFile(null);
    setFileLink('')
    resetRef.current?.();
  };

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
    ('');
    setFileLink('')
    setFile(null)
  }

  const handleUploadComplete = (fileLink) => {
    setUploadProgress(0)
    setFileLink(fileLink)
  }
  const onFileSelect = async (file) => {
    setFile(file)
    const key = `images/${file.name}`
    const content_type = file.type
    const {fileLink, signedUrl} = await imageService.getSignedUrl({key, content_type})
    await imageService.uploadFileToSignedUrl(
      signedUrl,
      file,
      content_type,
      null,
      () => handleUploadComplete(fileLink)
    )
  }
  const handleCreateOrUpdate = () => {
    const data = { title, description, price, imageUrl: fileLink };
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

  const setActiveEditState = (piece) => {
    setEditing(piece);
    setTitle(piece.title);
    setDescription(piece.description);
    setPrice(piece.price);
    setOpened(true);
  }

  if (loading) return <Loader size="xl" />;

  return (
    <Container>
      <Center  mt="md">
        <Button onClick={() => setOpened(true)} mb="md">Add Art</Button> 
      </Center>
      <SimpleGrid cols={{ base: 2, lg: 3 }}>
        {art.map(piece => 
          <Stack key ={piece.id}>
            <ArtCard art = {piece}/>
            <Group justify='center'>
              <Button onClick={()=>setActiveEditState(piece)}>
                Edit
              </Button>
              <Button 
                onClick={() => setDeleting(piece)} 
                color="red">Delete
              </Button>
            </Group>
          </Stack>
        )}
      </SimpleGrid>
      <Modal opened={opened} onClose={clearModal} title={editing ? "Edit Art" : "Add Art"}>
        <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <NumberInput label="Price" value={price} onChange={(val) => setPrice(val)} required />
        <Group justify="center" mt="md">
        <Button onClick={handleCreateOrUpdate} disabled={!fileLink && !editing}>{editing ? "Update" : "Create"}</Button>
        <FileButton onChange={onFileSelect} accept="image/png,image/jpeg" loading={uploadProgress > 0} disabled={fileLink}>
          {(props) => <Button {...props}>{!fileLink ? "Upload image": "File Uploaded!"}</Button>}
        </FileButton>
        <Button disabled={!file} color="red" onClick={clearFile}>
          Reset
        </Button>
      </Group>
      {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
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
