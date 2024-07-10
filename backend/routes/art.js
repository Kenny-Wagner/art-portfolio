const express = require('express');
const { getArtPieces, createArtPiece, updateArtPiece, deleteArtPiece } = require('../controllers/artController');
const router = express.Router();

router.get('/', getArtPieces);
router.post('/', createArtPiece);
router.put('/:id', updateArtPiece);
router.delete('/:id', deleteArtPiece);

module.exports = router;
