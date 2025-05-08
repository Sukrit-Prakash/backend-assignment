const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRoles = require('../middleware/authorizeRoles');
const { listPendingVideos, approveVideo, rejectVideo } = require('../controllers/adminController');

router.use(authenticateJWT, authorizeRoles('Admin'));

router.get('/videos/pending', listPendingVideos);
router.patch('/videos/:id/approve', approveVideo);
router.patch('/videos/:id/reject', rejectVideo);

module.exports = router;
