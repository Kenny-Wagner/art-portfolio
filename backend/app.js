const express = require('express');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const artRoutes = require('./routes/art');
const imageRoutes = require('./routes/image')

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('public'))
app.use('/api/auth', authRoutes);
app.use('/api/art', artRoutes);
app.use('/api/image', imageRoutes)

if (process.env.PROD === 'true') {
  // Serve static files from the 'dist' directory
  app.use(express.static(path.join(__dirname, 'dist')));
  // Catch-all route to serve React's index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });  
}

module.exports = app
