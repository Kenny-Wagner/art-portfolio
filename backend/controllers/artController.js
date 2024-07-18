const { ArtPiece } = require('../models');
const { deleteImage } = require('../util/s3')

const getArtPieces = async (req, res) => {
  try {
    console.log('in get art peices')
    const artPieces = await ArtPiece.findAll(); //See if better alternative to findAll
    res.json(artPieces);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createArtPiece = async (req, res) => {
  const { title, description, price, imageUrl } = req.body;
  try {
    const artPiece = await ArtPiece.create({ title, description, price, imageUrl });
    res.status(201).json(artPiece);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateArtPiece = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, imageUrl } = req.body;
  try {
    const artPiece = await ArtPiece.findByPk(id);
    if (!artPiece) return res.status(404).json({ error: 'ArtPiece not found' });

    await artPiece.update({ title, description, price, imageUrl });
    res.json(artPiece);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteArtPiece = async (req, res) => {
  const { id } = req.params;
  try {
    const artPiece = await ArtPiece.findByPk(id);
    if (!artPiece) return res.status(404).json({ error: 'ArtPiece not found' });

    await artPiece.destroy();
    await deleteImage(artPiece.imageUrl)
    res.json({ message: 'ArtPiece deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getArtPieces, createArtPiece, updateArtPiece, deleteArtPiece };
