import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "@mantine/core/styles.css"; //Do not remove
import ThemeProvider from './styles/theme';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import ManageArt from './pages/ManageArt';
import HeaderMenu from './components/HeaderMenu'

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <HeaderMenu/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage-art" element={<ManageArt />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
