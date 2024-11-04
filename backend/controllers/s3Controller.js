const { createPresignedPost, deleteImage } = require( '../services/imageService.js')

const getPresignedUrl = async (req, res) => {
    try {
        let { key, content_type} = req.body;
        key = 'public/' + key;
        const data = await createPresignedPost({ key, contentType: content_type });
        return res.send({
            status:"success",
            data
        });
    } catch (err) {
        console.error(`Failed getPresigneUrl, error is ${err}`);
        return res.status(500).send({
            status:"error",
            message: err.message
        });
    }
};

module.exports = { getPresignedUrl };