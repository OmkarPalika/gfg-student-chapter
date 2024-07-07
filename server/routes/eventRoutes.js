import { Router } from 'express';
import createEvent from '../controllers/eventController.js';
import getEvents from '../controllers/eventController.js';
import getEvent from '../controllers/eventController.js';
import updateEvent from '../controllers/eventController.js';
import deleteEvent from '../controllers/eventController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import eventValidation from '../validators/eventValidators.js';

const router = Router();

router.post('/', auth, validate(eventValidation), async (req, res) => {
  try {
    const event = await createEvent(req.body, req.user._id);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await getEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await getEvent(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, validate(eventValidation), async (req, res) => {
  try {
    const updatedEvent = await updateEvent(req.params.id, req.body, req.user._id);
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await deleteEvent(req.params.id, req.user._id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
