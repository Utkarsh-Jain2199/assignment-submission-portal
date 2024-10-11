const Assignment = require('../models/Assignment');
const User = require('../models/User');

exports.uploadAssignment = async (req, res) => {
    const { task, admin } = req.body;
    const adminUser = await User.findOne({ username: admin, role: 'Admin' });

    if (!adminUser) return res.status(404).json({ error: 'Admin not found' });

    const assignment = new Assignment({
        userId: req.user.id,
        task,
        adminId: adminUser._id,
        status: 'Pending',
    });

    await assignment.save();
    res.status(201).json({ message: 'Assignment uploaded successfully' });
};

exports.getAdminAssignments = async (req, res) => {
    const assignments = await Assignment.find({ adminId: req.user.id });
    res.json(assignments);
};

exports.acceptAssignment = async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment || assignment.adminId.toString() !== req.user.id) {
        return res.status(404).json({ error: 'Assignment not found' });
    }

    assignment.status = 'Accepted';
    await assignment.save();
    res.json({ message: 'Assignment accepted' });
};

exports.rejectAssignment = async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment || assignment.adminId.toString() !== req.user.id) {
        return res.status(404).json({ error: 'Assignment not found' });
    }

    assignment.status = 'Rejected';
    await assignment.save();
    res.json({ message: 'Assignment rejected' });
};
