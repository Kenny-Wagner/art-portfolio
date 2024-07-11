const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const artRoutes = require('./routes/art');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static('testPics'))
app.use('/api/auth', authRoutes);
app.use('/api/art', artRoutes);

module.exports = app