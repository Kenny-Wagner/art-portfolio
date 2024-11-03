import { useEffect, useState, useRef } from 'react';
import { 
  Container, Center, SimpleGrid, Group, Button, FileButton,
   Modal, Text, TextInput, Textarea, NumberInput, Select, Loader, 
   Stack, Alert  
  } from '@mantine/core';
import { useForm } from '@mantine/form';
import artService from '../services/artService';
import imageService from '../services/imageService';
import ArtCard from '../components/ArtCard';

const ManageArt = () => {
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activePiece, setActivePiece] = useState(null);
  const [error, setError] = useState(false)
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const resetRef = useRef(null);
  const artTypes = ['Animation', 'FanArt', 'Original'];
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      year: null,
      size: '',
      medium: '',
      description: '',
      price: null,
      type: '',
    },
    validate: {
      title : (value) => (value.length === 0 ? 'Piece must have a valid name' : null),
      year : (value) => (Number(value) <= 2015 || Number(value) > new Date().getFullYear() ? `Please enter a valid year between 2015 and now` : null),
      size : (value) => {
        if (!value) return null
        return (/^\d+[x]\d+$/.test(value) ? null : 'Size must be of the form 9x12')
      },
      medium: (value) => (value.length === 0 ? 'Must enter a medium' : null),
      description: (value) => (value.length === 0 ? 'Must enter a description' : null),
      type: (value) => (artTypes.includes(value) ? null : 'Must select a type')
    }
  })

  const clearFile = () => {
    setFile(null);
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
    }

    form.reset();
    setActivePiece(null);
    setFile(null)
  }

  const uploadFile = async () => {
    const key = `${form.getValues().type}/${file.name}`;
    const content_type = file.type;
    const { fileLink, signedUrl } = await imageService.getSignedUrl({ key, content_type });

    await imageService.uploadFileToSignedUrl(
      signedUrl,
      file,
      content_type,
      () => setUploading(true),
      () => setUploading(false)
    )

    return fileLink;
  }

  const handleCreateOrUpdate = async (event) => {
    event.preventDefault();
    
    if (form.validate().hasErrors) return;
    if (!file && !activePiece) {
      setError(true)
      return
    }
    const imageUrl = activePiece?.imageUrl || await uploadFile()

    const data = { ...form.getValues(), imageUrl: imageUrl };

    if (activePiece) {
      artService.updateArt(activePiece.id, data).then(() => {
        setArt(art.map(piece => piece.id === activePiece.id ? { ...piece, ...data } : piece));
        setEditing(false);
        setActivePiece(null)
      });
    } else {
      artService.createArt(data).then(response => {
        setArt([...art, response.data]);
      });
    }
    clearModal();
  };

  const handleConfirmDelete = () => {
    if (deleting) {
      artService.deleteArt(activePiece.id).then(() => {
        setArt(art.filter(piece => piece.id !== activePiece.id));
        setDeleting(false);
      });
    }
  };

  const handleEditClick = (piece) => {
    form.setValues({
      title: piece.title,
      year: piece.year,
      size: piece.size,
      medium: piece.medium,
      description: piece.description,
      price: piece.price,
      type: piece.type
    })
    setActivePiece(piece);
    setEditing(true);
  }

  const handleDeleteClick = (piece) => {
    setActivePiece(piece);
    setDeleting(true);
  }

  if (loading) return <Center><Loader size="xl" /></Center>;

  return (
    <Container>
      <Center>
        <Button onClick={() => setEditing(true)} mb="lg" size ='lg'>Add Art</Button> 
      </Center>
      <SimpleGrid cols={{ base: 2, lg: 3 }}>
        {art.map(piece => 
          <Stack key ={piece.id}>
            <ArtCard art = {piece}/>
            <Group justify='center'>
              <Button onClick={() => handleEditClick(piece)}>
                Edit
              </Button>
              <Button 
                onClick={() => handleDeleteClick(piece)} 
                color="red">
                Delete
              </Button>
            </Group>
          </Stack>
        )}
      </SimpleGrid>
      <Modal opened={editing} onClose={clearModal} title={activePiece ? "Edit Art" : "Add Art"}>
        {error && <Alert variant="filled" color="red" withCloseButton title="Error" onClose = {() => setError(false)}> You must select an image!</Alert>}
        <form onSubmit = {(event) =>handleCreateOrUpdate(event)}>
          <TextInput label="Title" key = {form.key('title')} {...form.getInputProps('title')} withAsterisk />
          <NumberInput label="Year" key = {form.key('year')} {...form.getInputProps('year')} withAsterisk />
          <TextInput label="Size" key = {form.key('size')} {...form.getInputProps('size')} />
          <TextInput label="Medium" key = {form.key('medium')} {...form.getInputProps('medium')} withAsterisk />
          <Textarea label="Description" key = {form.key('description')} {...form.getInputProps('description')} autosize minRows ={2} maxRows={4} withAsterisk />
          <NumberInput label="Price" key = {form.key('price')} {...form.getInputProps('price')} prefix="$" />
          <Select label ="Type" data ={artTypes} key = {form.key('type')} {...form.getInputProps('type')} withCheckIcon={false} withAsterisk/>
          <Group justify="center" mt="md">
            <Button type = 'submit' loading = {uploading}>{activePiece ? "Update" : "Create"}</Button>
            {!file && 
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => <Button {...props}>Select File</Button>}
            </FileButton>
            }
            {file &&
             <Button color="red" onClick={clearFile}> Reset File </Button>
            }
          </Group>
          {file && 
          <Text size="sm" ta="center" mt="sm">
            Picked file: {file.name}
          </Text>
          }
        </form>
      </Modal>
      <Modal opened={deleting}  withCloseButton={false} closeOnClickOutside={false} centered={true} size="md">
        <Text size="xl" ta="center">Delete {activePiece?.title}?</Text>
        <Group justify="center" mt="lg">
          <Button variant="filled" color="red" onClick={handleConfirmDelete}>Delete</Button>
          <Button variant="filled" color="gray" onClick={() => setDeleting(false)}>Cancel</Button>  
        </Group>
      </Modal>
            
    </Container>
  );
};

export default ManageArt;
