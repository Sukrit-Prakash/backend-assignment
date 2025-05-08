const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRoles = require('../middleware/authorizeRoles');
const { uploadVideo } = require('../controllers/videoController');

router.post(
  '/',
  authenticateJWT,
  authorizeRoles('Artist'),
  upload.fields([{ name: 'video' }, { name: 'thumbnail' }]),
  uploadVideo
);

module.exports = router;
