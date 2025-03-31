const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookings');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// User endpoints
router.post('/', authMiddleware, bookingsController.createBooking);
router.get('/user', authMiddleware, bookingsController.getUserBookings);
router.get('/:id', authMiddleware, bookingsController.getBookingDetails);

// Manager-only endpoints
router.get('/all', authMiddleware, roleMiddleware('manager'), bookingsController.getAllBookings);
router.get('/stats/sales', authMiddleware, roleMiddleware('manager'), bookingsController.getSalesStats);

// Staff ticket management endpoints
router.get('/search', authMiddleware, roleMiddleware('staff', 'manager'), bookingsController.searchBookingByCode);
router.put('/:id/status', authMiddleware, roleMiddleware('staff', 'manager'), bookingsController.updateBookingStatus);
router.get('/staff/all', authMiddleware, roleMiddleware('staff', 'manager'), bookingsController.getAllTickets);

// Keep existing root GET endpoint for backward compatibility
router.get('/', authMiddleware, bookingsController.getUserBookings);

module.exports = router;
