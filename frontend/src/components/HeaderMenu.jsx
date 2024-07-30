import { Link, useNavigate } from 'react-router-dom';
import { Menu, Group, Image, Center, Button, Burger, Container, Drawer, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import classes from './HeaderMenu.module.css';

const HeaderMenu = ({ user, onLogout }) => {
  const [opened, { toggle }] = useDisclosure();
  const links = [
    {
      link: '#1',
      label: 'Collections',
      links: [
        { link: '/?filter=all', label: 'All' },
        { link: '/?filter=animation', label: 'Animations' },
        { link: '/?filter=fanart', label: 'Fan Art' },
        { link: '/?filter=original', label: 'Originals' }
      ],
    },
    { link: '/about', label: 'About' },
    { link: '/contact', label: 'Contact' },
    user?.isAdmin ? { link: '/manage-art', label: 'Manage Art' } : null,
  ].filter(Boolean);

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
      <Menu.Item key={item.label}>    
        <Link onClick={() => toggle()} to={item.link} className={classes.link}>
          {item.label}
         </Link>
      </Menu.Item>
    ));


    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a href={link.link} className={classes.link} onClick={() => {navigate(link.link)}}>
                <span>{link.label}</span>
                <IconChevronDown size="1rem" stroke={1.5} />
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
        <Group justify="space-between">
        <Group className={`${classes.group} ${classes.fullWidthGroup}`}>
        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" hiddenFrom="sm"  />
        <Image src ={`${import.meta.env.VITE_BACKEND_URL}/logo.png`} w='50px' h='50px'/>
        </Group>
        <Group className={classes.links} visibleFrom='sm'>
          {items}
        </Group>
        <Group className={classes.authButtons} visibleFrom='sm'>
        <Button variant="default" onClick={handleLoginLogout}>
          {user ? 'Log out' : 'Log in'}
        </Button>
        {!user && (
          <Button className={classes.authButton} onClick={() => navigate('/register')}>
            Register
          </Button>
        )}
        </Group>
      </Group>
      </Container>
      <Drawer size="md" opened = {opened} onClose={toggle} position="left" hiddenFrom='sm'> 
        <Stack hiddenFrom='sm'>
            {items}
            <Stack className={classes.authButtons} hiddenFrom='sm'>
            <Button variant="default" onClick={handleLoginLogout}>
              {user ? 'Log out' : 'Log in'}
            </Button>
            {!user && (
              <Button className={classes.authButton} onClick={() => navigate('/register')}>
                Register
              </Button>
            )}
          </Stack>
        </Stack>
      </Drawer>
    </header>
  );
};

export default HeaderMenu;
