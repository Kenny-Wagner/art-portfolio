const express = require('express');
const { getArtPieces, createArtPiece, updateArtPiece, deleteArtPiece } = require('../controllers/artController');
const router = express.Router();
const {authenticate, isAdmin} = require('../middlewares/auth')

router.get('/', getArtPieces);
router.post('/', authenticate, isAdmin, createArtPiece);
router.put('/:id', authenticate, isAdmin, updateArtPiece);
router.delete('/:id', authenticate, isAdmin, deleteArtPiece);

module.exports = router;
