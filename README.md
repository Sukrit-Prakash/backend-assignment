# 🎥 Video Upload & Admin Panel API

A secure and modular REST API built with Node.js and Express for a video streaming platform. It supports JWT-based authentication, role-based access control, video uploads to Cloudinary, and an admin approval workflow.

---

## 📦 Features

- ✅ User Registration & Login with hashed passwords
- 🔐 JWT-based Authentication & Role-based Authorization
- 📤 Artists can upload videos & thumbnails to **Cloudinary**
- 📝 Metadata stored locally (JSON-based mock DB)
- 👮 Admin Panel (API only) to approve/reject videos
- 🧪 Postman-ready endpoints for full testing

---

## 🛠️ Tech Stack

- **Node.js + Express**
- **Cloudinary** (for media storage)
- **bcrypt** (for password hashing)
- **jsonwebtoken** (for JWT)
- **multer** (for file uploads)
- **uuid** (for unique video IDs)

---

## 📁 Project Structure

├── controllers/
│ ├── authController.js
│ └── videoController.js
├── middlewares/
│ ├── authMiddleware.js
│ └── upload.js
├── models/
│ ├── userModel.js
│ └── videoModel.js
├── routes/
│ ├── authRoutes.js
│ ├── videoRoutes.js
│ └── adminRoutes.js
├── utils/
│ └── cloudinary.js
├── data/
│ ├── users.json
│ └── videos.json
├── .env
├── .gitignore
├── README.md
├── server.js



---

## 🧪 API Endpoints

### 1. 🔐 Auth

#### `POST /auth/register`
Register as **Admin**, **Artist**, or **Viewer**.

#### `POST /auth/login`
Login and receive a **JWT token**.

---

### 2. 📤 Videos (Artist)

#### `POST /videos`
Upload video + thumbnail (multipart/form-data).  
🔐 Protected: Artist-only

#### `GET /videos`
List all approved videos.  
🔓 Public

---

### 3. 👮 Admin Panel (Admin)

#### `GET /admin/videos/pending`
View videos pending approval.

#### `PATCH /admin/videos/:id/approve`
Approve a video.

#### `PATCH /admin/videos/:id/reject`
Reject a video.

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/video-upload-api.git
cd video-upload-api

 2.
 Install Dependencies

npm install

3.Create .env File

PORT=5000
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4.Run the Server

npm run dev




Assumptions
No real database used — JSON files simulate DB.

No front-end UI provided.

Cloudinary is used as media storage.



📄 License
This project is open-source under the MIT License.