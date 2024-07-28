import { Card, Text, Group } from '@mantine/core';
import classes from './ArtCard.module.css';

const ArtCard = ({ art, setArtpiece, open }) => {

  const handleClick = () => {
    setArtpiece(art)
    setTimeout(() => {
      open();
    }, 1); //Need or else inital transition on modal open doesn't render
  }
  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="button"
      onClick={handleClick}
    >
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${art.imageUrl})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            {art.title}
          </Text>
        </div>
      </div>
    </Card>
  );
}

export default ArtCard;
