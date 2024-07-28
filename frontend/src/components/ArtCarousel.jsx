import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, Group, Text, Title, Button, useMantineTheme, rem } from '@mantine/core';
import classes from './ArtCarousel.module.css';
import { useNavigate } from 'react-router-dom';

const ArtCarouselCard = ({ artpiece }) => {

  const navigate = useNavigate()

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${artpiece.imageUrl})` }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          {artpiece.title}
        </Title>
      </div>
      <Group className={classes.infoGroup}>
        <Button onClick = {() => navigate(`/?filter=${artpiece.type}&id=${artpiece.id}`)} variant="white" color="dark">
          View in collection
        </Button>
        <Text className={classes.category} size="xs">
          Sold for ${artpiece.price}
        </Text>
      </Group>
    </Paper>
  );
}

const ArtCarousel = ({ art }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = art.map((artpiece) => (
    <Carousel.Slide key={artpiece.title}>
      <ArtCarouselCard artpiece={artpiece} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      classNames={classes}
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: rem(2), sm: 'xl' }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
}

export default ArtCarousel;
