const cloudinary = require('../config/cloudinaryConfig');
const { v4: uuidv4 } = require('uuid');
const { addVideo } = require('../models/videoModel');

exports.uploadVideo = async (req, res) => {
    try {
        const { title, description, category, genre, version } = req.body;

        if (!title || !description || !category || !genre || !version) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (req.files ) {
            if(!req.files.video) {
                return res.status(400).json({ error: 'Video file is required' });
            }
            if(!req.files.thumbnail) {
                return res.status(400).json({ error: 'Thumbnail file is required' });
            }
            
        }
        else
        {
            return res.status(400).json({ error: 'Files are required' });
        }

        if (!Array.isArray(req.files.video) || req.files.video.length === 0) {
            return res.status(400).json({ error: 'Video file is missing or improperly uploaded' });
        }

        if (!Array.isArray(req.files.thumbnail) || req.files.thumbnail.length === 0) {
            return res.status(400).json({ error: 'Thumbnail file is missing or improperly uploaded' });
        }

        const videoFile = req.files.video[0];
        const thumbnailFile = req.files.thumbnail[0];

        if (!videoFile.mimetype.startsWith('video/')) {
            return res.status(400).json({ error: 'Uploaded file is not a valid video' });
        }

        if (!thumbnailFile.mimetype.startsWith('image/')) {
            return res.status(400).json({ error: 'Uploaded file is not a valid image' });
        }

        // const videoFile = req.files.video[0];
        // const thumbnailFile = req.files.thumbnail[0];

        if (!videoFile || !thumbnailFile) {
            return res.status(400).json({ error: 'Invalid file upload' });
        }

        let videoUpload, thumbnailUpload;

        try {
            videoUpload = await cloudinary.uploader.upload(videoFile.path, { resource_type: 'video' });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to upload video to Cloudinary' });
        }

        try {
            thumbnailUpload = await cloudinary.uploader.upload(thumbnailFile.path, { resource_type: 'image' });
        } catch (err) {
            return res.status(500).json({ error: 'Failed to upload thumbnail to Cloudinary' });
        }

        const video = {
            id: uuidv4(),
            title,
            description,
            category,
            genre,
            version,
            videoUrl: videoUpload.secure_url,
            thumbnailUrl: thumbnailUpload.secure_url,
            artistId: req.user.id,
            status: 'pending'
        };

        try {
            addVideo(video);
        } catch (err) {
            return res.status(500).json({ error: 'Failed to save video to database' });
        }

        res.status(201).json({ message: 'Video uploaded', video });
    } catch (err) {
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
};
