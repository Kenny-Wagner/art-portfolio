import { Link, useNavigate } from 'react-router-dom';
import { Menu, Group, Center, Button, Container, Box, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './HeaderMenu.module.css';

const HeaderMenu = ({ user, onLogout }) => {
  const links = [
    {
      link: '#1',
      label: 'Collections',
      links: [
        { link: '/', label: 'All' },
        { link: '/3', label: 'Collection 2' },
        { link: '/4', label: 'Collection 3' },
      ],
    },
    { link: '/about', label: 'About' },
    { link: '/contact', label: 'Contact' },
    user?.isAdmin ? { link: '/manage-art', label: 'Manage Art' } : null,
  ].filter(Boolean);

  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (!user) {
      navigate('/login');
    } else {
      onLogout();
    }
  };

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>    
        <Link to={item.link} className={classes.link}>
          {item.label}
         </Link>
      </Menu.Item>
    ));


    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a href={link.link} className={classes.link} onClick={(event) => navigate(link.link)}>
              <Center>
                <span>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} to={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="lg">
        <Flex className={classes.inner} justify="space-between" align="center">
          <Box className={classes.logo}>Tibial Rose</Box>
          <Group className={classes.links}>
            {items}
          </Group>
          <Group className={classes.authButtons}>
            <Button variant="default" onClick={handleLoginLogout}>
              {user ? 'Log out' : 'Log in'}
            </Button>
            {!user && (
              <Button className={classes.authButton} onClick={() => navigate('/register')}>
                Register
              </Button>
            )}
          </Group>
        </Flex>
      </Container>
    </header>
  );
};

export default HeaderMenu;
