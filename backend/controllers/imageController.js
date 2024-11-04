const imageService = require('../services/imageService');

const uploadNewImage = async (req, res) => {

    const {file, type} = req.body
    console.log(`req.body is ${JSON.stringify(req.body)}`)

};

const updateExistingImage = async () => {

};



module.exports = { uploadNewImage, updateExistingImage };