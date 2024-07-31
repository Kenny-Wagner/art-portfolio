const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const artRoutes = require('./routes/art');
const s3Routes = require('./routes/s3')

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.static('dist'))
app.use(express.static('public'))
app.use('/api/auth', authRoutes);
app.use('/api/art', artRoutes);
app.use('/api/s3', s3Routes)

// Catch-all route to serve React's index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

module.exports = app
