const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Group = require('../models/Group');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new post in a group
router.post('/create/:groupId', authMiddleware, async (req, res) => {
    try {
        const { content } = req.body;
        const group = await Group.findById(req.params.groupId);

        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (!group.members.includes(req.user.id)) {
            return res.status(403).json({ message: 'You are not a member of this group' });
        }

        const post = new Post({
            group: req.params.groupId,
            author: req.user.id,
            content
        });

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all posts in a group
router.get('/:groupId', async (req, res) => {
    try {
        const posts = await Post.find({ group: req.params.groupId }).populate('author', 'username');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
