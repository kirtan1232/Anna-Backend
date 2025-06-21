const express = require('express');
const router = express.Router();
const { registerUser, loginUser, forgotPassword, resetPassword, sendResetPasswordMail, getUserProfile, updateProfile } = require('../controller/authController');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');
const profileUpload = require("../middleware/profileUploadMiddleware");
const User = require('../model/User');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotPassword', forgotPassword);
router.post('/sendResetMailPassword', sendResetPasswordMail);
router.post('/reset-password', resetPassword);
router.get('/profile', verifyToken, getUserProfile);
router.put("/update-profile", verifyToken, profileUpload, updateProfile);
router.get('/users', verifyToken, authorizeRole(['admin']), (req, res) => {
    User.find().select('createdAt role').then(users => res.json(users)).catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router;