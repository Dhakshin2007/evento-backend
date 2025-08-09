const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/authMiddleware');

router.get('/bookings', auth, adminController.getAllBookings);
router.post('/workers', auth, adminController.createWorker);
router.get('/workers', auth, adminController.getWorkers);

module.exports = router;