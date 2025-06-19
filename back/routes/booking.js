const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Create a booking (protected)
router.post('/', auth, bookingController.createBooking);

// Get bookings for a listing
router.get('/', bookingController.getBookingsByListingId);

module.exports = router; 