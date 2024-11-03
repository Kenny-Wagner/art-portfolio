import { Paper, BackgroundImage, Text } from '@mantine/core';
import classes from './ArtCard.module.css';

const ArtCard = ({ art, onClick }) => {
  return (
    <Paper
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="button"
      onClick={onClick}
    >
      <BackgroundImage src={art.imageUrl} className={classes.image} />
      <div className={classes.overlay} />
      <div className={classes.content}>
        <Text size="lg" className={classes.title} fw={500}>
          {art.title}
        </Text>
      </div>
    </Paper>
  );
};

export default ArtCard;
