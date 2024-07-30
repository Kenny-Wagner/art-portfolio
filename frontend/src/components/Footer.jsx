import { Link } from 'react-router-dom';
import { Group, ActionIcon, rem, Box, Container } from '@mantine/core';
import { IconBrandTwitter, IconBrandInstagram, IconBrandYoutube } from '@tabler/icons-react';
import classes from './Footer.module.css';

const links = [
  { link: '/about', label: 'About' },
  { link: '/contact', label: 'Contact' },
];

const twitterLink = 'https://x.com/reebeo'
const instagramLink = 'https://www.instagram.com/reebeo.art'
const youtubeLink = 'https://www.youtube.com/@reebeo'

const Footer = () => {
  const items = links.map((link) => (
    <Link key={link.label} to={link.link}>
      {link.label}
    </Link>
  ));

  return (
    <Box component="footer" className={classes.footer}>
      <Container className={classes.inner}>
        <Box className={classes.logo}>Reebeo</Box>
        <Group className={classes.links}>{items}</Group>
        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon component="a" href={instagramLink} size="lg" variant="default" radius="xl">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon component="a" href={twitterLink} size="lg" variant="default" radius="xl">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon component="a" href={youtubeLink} size="lg" variant="default" radius="xl">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </Box>
  );
};

export default Footer;
