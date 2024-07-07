// routes/notifications.js
import { Router } from 'express';
import Notification from '../models/Notification.js';
import auth from '../middleware/auth.js';

const router = Router();

// GET all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ timestamp: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// POST create a new notification (optional, if needed)
router.post('/', auth, async (req, res) => {
  try {
    const { title, message } = req.body;
    const newNotification = new Notification({ title, message });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(400).json({ error: 'Failed to create notification' });
  }
});

export default router;
