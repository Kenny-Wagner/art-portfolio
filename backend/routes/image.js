const express = require('express');
const router = express.Router()
const multer = require('multer')
const saveFileToMemory = multer({ storage: multer.memoryStorage() });
const { authenticate } = require('../middlewares/auth')

const { uploadNewImage } = require('../controllers/imageController')

router.post('/', authenticate, saveFileToMemory.single('file'), uploadNewImage);

module.exports = router;