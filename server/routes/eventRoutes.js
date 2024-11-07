const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Route to create a new event
router.post('/create', eventController.createEvent);

// Route to fetch all events
router.get('/fetch', eventController.fetchEvents);
router.patch('/update/:id', eventController.editEvent);
router.delete('/delete/:id', eventController.deleteEvent);

module.exports = router;