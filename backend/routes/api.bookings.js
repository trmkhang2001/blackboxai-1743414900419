const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, bookingsController.createBooking);
router.get('/', authMiddleware, bookingsController.getUserBookings);

module.exports = router;