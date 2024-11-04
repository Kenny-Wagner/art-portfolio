const express = require('express');
const router = express.Router()
const multer = require('multer')
const saveFileToMemory = multer({ storage: multer.memoryStorage() });

const { uploadNewImage, updateExistingImage } = require('../controllers/imageController')

router.post('/', saveFileToMemory.single('file'), uploadNewImage);
router.put('/:id', saveFileToMemory.single('file'), updateExistingImage)

module.exports = router;