// upload.route.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/file.model');

const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Cloud folder
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
  },
});

const upload = multer({ storage });




router.post('/upload', upload.single('myFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Save to DB
  await File.create({
    user: 'Anuj',
    fileUrl: req.file.path,
  });

  // Fetch all files
  const files = await File.find().sort({ uploadedAt: -1 });

  // Render home.ejs with the list
  res.render('home', {
    fileUrl: req.file.path,
    allFiles: files,
  });
});

module.exports = router;
