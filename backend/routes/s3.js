const express = require('express');
const router = express.Router()
const { getPresignedUrl } = require('../controllers/s3Controller')

router.post('/signed_url', getPresignedUrl)

module.exports = router;