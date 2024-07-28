import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, Text, Title, Button, useMantineTheme, rem } from '@mantine/core';
import classes from './ArtCarousel.module.css';

const ArtCarouselCard = ({ artpiece }) => {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${artpiece.imageUrl})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {artpiece.price}
        </Text>
        <Title order={3} className={classes.title}>
          {artpiece.title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        View in collection
      </Button>
    </Paper>
  );
}

const  ArtCarousel = ({art}) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = art.map((artpiece) => (
    <Carousel.Slide key={artpiece.title}>
      <ArtCarouselCard artpiece = {artpiece} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: rem(2), sm: 'xl' }}
      align="start"
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  );
}

export default ArtCarousel