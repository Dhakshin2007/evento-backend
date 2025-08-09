const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/authMiddleware');

router.post('/:eventId', auth, bookingController.createBooking);
router.get('/my-bookings', auth, bookingController.getMyBookings);
router.post('/scan', auth, bookingController.scanTicket);

module.exports = router;