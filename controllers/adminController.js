const { getPendingVideos, updateVideoStatus } = require('../models/videoModel');

exports.listPendingVideos = (req, res) => {
  const videos = getPendingVideos();
  res.json(videos);
};

exports.approveVideo = (req, res) => {
  updateVideoStatus(req.params.id, 'approved');
  res.json({ message: 'Video approved' });
};

exports.rejectVideo = (req, res) => {
  updateVideoStatus(req.params.id, 'rejected');
  res.json({ message: 'Video rejected' });
};
