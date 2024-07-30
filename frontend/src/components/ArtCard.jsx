import {Paper, BackgroundImage, Title, Text } from '@mantine/core';
import classes from './ArtCard.module.css';

const ArtCard = ({ art, setArtpiece, open }) => {
  const handleClick = () => {
    setArtpiece(art);
    setTimeout(() => {
      open();
    }, 1); // Need or else initial transition on modal open doesn't render
  };

  return (
    <Paper
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="button"
      onClick={handleClick}
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
