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
import { useState, useEffect } from 'react'

const App = () => {
  const [user, setUser] = useState(null)
  const onLogin = (loggedInUser) => {
    setUser(loggedInUser)
  }
  const onLogout = () => {
    localStorage.removeItem('user');
    setUser(null)
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])
  return (
    <ThemeProvider>
      <Router>
        <HeaderMenu user = {user} onLogout = {onLogout}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={onLogin} onLogout={onLogout} user={user} />} />
          <Route path="/manage-art" element={<ManageArt />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
