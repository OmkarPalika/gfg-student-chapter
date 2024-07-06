import { Router } from 'express';
const router = Router();
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent } from '../controllers/eventController';
import auth from '../middleware/auth';

router.post('/', auth, createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);

export default router;