const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const User = require('../schema/User'); // Import the User model
const authenticateUser = require('../middleware/auth'); // Middleware for authentication

// Set up Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Ensure unique file names
  },
});

// File filter to allow only image uploads
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Route to upload a profile picture
router.post(
  '/upload-profile-picture',
  authenticateUser, // Ensure the user is authenticated
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const profilePictureUrl = `/uploads/${req.file.filename}`; // Generate the file URL

      // Update the user's profile in the database
      const user = await User.findByIdAndUpdate(
        req.user.userId, // Assuming `userId` is added to `req.user` by the authentication middleware
        { profilePicture: profilePictureUrl },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'Profile picture updated', profilePictureUrl });
    } catch (error) {
      console.error('Error uploading profile picture:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;
