import { Modal, Image, Flex, Paper, Title, Text, Stack, Container, Center } from '@mantine/core';
import styles from './ArtModal.module.css';

const ArtModal = ({ artpiece, opened, close }) => {

  if (!artpiece) return null;

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={close} 
        withCloseButton={false} 
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        size="auto"
        transitionProps={{
          transition: 'pop',
          duration: 400,
          timingFunction: "ease"
        }}
      >
        <Flex direction={{ base: 'column', sm: 'row' }} gap='md'>
          <Center>
            <Container size="xs" className={styles.container}>
            <Image radius='sm' src={artpiece.imageUrl} className={styles.image} />
          </Container>
          </Center>
          <Flex direction="column">
            <Paper shadow="xs" p="xl" mb='md' className={styles.paperTitle}>
              <Title align='center' mb='xl'>{artpiece.title}</Title>
              <Stack spacing="xs" align="flex-start">
                <Text>{artpiece.year}</Text>
                <Text>{artpiece.size}</Text>
                <Text>{artpiece.medium}</Text>
              </Stack>
            </Paper>
            <Paper shadow="xs" p="xl" className={styles.paperDescription}>
              <Text>{artpiece.description}</Text>
            </Paper>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}

export default ArtModal;
