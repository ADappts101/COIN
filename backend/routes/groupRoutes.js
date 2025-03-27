const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new group (only authenticated users)
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if group already exists
        let group = await Group.findOne({ name });
        if (group) return res.status(400).json({ message: 'Group name already taken' });

        group = new Group({
            name,
            description,
            creator: req.user.id,
            members: [req.user.id]
        });

        await group.save();
        res.status(201).json(group);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Join a group
router.post('/join/:groupId', authMiddleware, async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (group.members.includes(req.user.id)) {
            return res.status(400).json({ message: 'You are already a member' });
        }

        group.members.push(req.user.id);
        await group.save();
        res.json({ message: 'Joined group successfully', group });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all groups
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find().populate('creator', 'username');
        res.json(groups);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
