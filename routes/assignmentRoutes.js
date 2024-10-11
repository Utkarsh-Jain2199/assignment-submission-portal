const express = require('express');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const User = require('../models/User');
const { uploadAssignment, getAdminAssignments, acceptAssignment, rejectAssignment } = require('../controllers/assignmentController');

const router = express.Router();

router.post('/upload', auth, uploadAssignment);
router.get('/admins', auth, async (req, res) => {
    const admins = await User.find({ role: 'Admin' }).select('username');
    res.json(admins);
});

router.get('/assignments', auth, isAdmin, getAdminAssignments);
router.post('/assignments/:id/accept', auth, isAdmin, acceptAssignment);
router.post('/assignments/:id/reject', auth, isAdmin, rejectAssignment);

module.exports = router;
