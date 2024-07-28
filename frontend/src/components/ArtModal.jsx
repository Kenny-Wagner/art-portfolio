import { Modal, Image, Flex, Paper, Title, Text, Stack } from '@mantine/core';
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
        size="auto" // Auto size the modal based on content
        transitionProps={{
          transition: 'pop', // Add transition type
          duration: 400, // Set transition duration (in ms)
          timingFunction: "ease"
        }} 
        styles={{
          modal: styles.modal,
        }}
      >
        <Flex direction="row" wrap="nowrap" gap='md' className={styles.flexContainer}>
          <Image radius='sm'src={artpiece.imageUrl} className={styles.image} />
          <Flex direction="column" className={styles.flexColumn}>
            <Paper shadow="xs" p="xl" mb='md' className={styles.paperTitle}>
              <Title align='center' mb='xl'>{artpiece.title}</Title>
              <Stack spacing="xs" align="flex-start">
                <Text>2024</Text>
                <Text>11x17</Text>
                <Text>Acrylic on canvas</Text>
              </Stack>
            </Paper>
            <Paper shadow="xs" p="xl" className={styles.paperDescription}>
              <Text>word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word </Text>
            </Paper>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}

export default ArtModal;
