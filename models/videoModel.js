const fs = require('fs');
const path = './data/videos.json';

function readVideos() {
  return JSON.parse(fs.readFileSync(path));
}

function writeVideos(videos) {
  fs.writeFileSync(path, JSON.stringify(videos, null, 2));
}

function addVideo(video) {
  const videos = readVideos();
  videos.push(video);
  writeVideos(videos);
  console.log(`-- SQL: INSERT INTO videos (title, url, status) VALUES (${video.title}, ${video.videoUrl}, ${video.status});`);
}

function getPendingVideos() {
  return readVideos().filter(v => v.status === 'pending');
}

function updateVideoStatus(id, status) {
  const videos = readVideos();
  const video = videos.find(v => v.id === id);
  if (video) {
    video.status = status;
    writeVideos(videos);
    console.log(`-- SQL: UPDATE videos SET status = '${status}' WHERE id = '${id}';`);
  }
}

module.exports = { addVideo, getPendingVideos, updateVideoStatus };
