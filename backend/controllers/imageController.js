const imageService = require('../services/imageService');

const uploadNewImage = async (req, res) => {
    const file = req.file
    const key = `public/${req.body.type}/${file.originalname}`

    try {
        const imageUrl = await imageService.createImage(file, key);
        res.status(201).json({imageUrl});
    } catch (error) {
        res.status(400).json({error: error.message})
    }

};

module.exports = { uploadNewImage };