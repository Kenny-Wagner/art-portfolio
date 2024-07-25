import { IconEye, IconMessageCircle } from '@tabler/icons-react';
import { Card, Text, Group, Center, useMantineTheme, rem } from '@mantine/core';
import classes from './ArtCard.module.css';

const ArtCard = ({ art }) => {

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
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

          <Group position="apart" spacing="xs">
            <Text size="sm" className={classes.description}>
              {art.description}
            </Text>
          </Group>
        </div>
      </div>
    </Card>
  );
}

export default ArtCard;
