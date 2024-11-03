import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import "@mantine/core/styles.css"; // Do not remove
import '@mantine/carousel/styles.css';

import { MantineProvider } from '@mantine/core';
import { useState, useEffect } from 'react';
import Collections from './pages/Collections';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import ManageArt from './pages/ManageArt';
import HeaderMenu from './components/HeaderMenu';
import Footer from './components/Footer';
import classes from './App.module.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const App = () => {
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  const onLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const onLogout = () => {
    localStorage.removeItem('user');
    setUser(null);

    if (location.pathname.includes('manage-art')) {
      navigate('/')
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, []);

  return (
    <MantineProvider>
      <ScrollToTop />
      <div className={classes.wrapper}>
        <HeaderMenu user={user} onLogout={onLogout} />
        <main className={classes.mainContent}>
          <Routes>
            <Route path="/" element={<Collections />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={onLogin} onLogout={onLogout} user={user} />} />
            <Route path="/manage-art" element={<ManageArt />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MantineProvider>
  );
};

export default App;
