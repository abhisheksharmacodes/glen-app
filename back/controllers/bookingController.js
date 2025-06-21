const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const User = require('../models/User');

// Helper: Check for date overlap
function isOverlap(start1, end1, start2, end2) {
  return (start1 <= end2) && (end1 >= start2);
}

// Helper: Check if date is in the past
function isDateInPast(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of today
  return new Date(date) < today;
}

// POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { listingId, startDate, endDate, guests } = req.body;
    const userId = req.user.userId;

    // Validate listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    // Validate dates
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    // Check if start date is in the past
    if (isDateInPast(startDate)) {
      return res.status(400).json({ message: 'Start date cannot be in the past' });
    }
    
    // Check if end date is in the past
    if (isDateInPast(endDate)) {
      return res.status(400).json({ message: 'End date cannot be in the past' });
    }
    
    // Check if start date is after end date
    if (startDateObj > endDateObj) {
      return res.status(400).json({ message: 'Start date must be before or equal to end date' });
    }

    // Validate guests
    if (guests < 1 || guests > listing.guests) {
      return res.status(400).json({ message: `Guests must be between 1 and ${listing.guests}` });
    }

    // Check for overlapping bookings
    const existingBookings = await Booking.find({
      listingId,
      startDate: { $lte: endDateObj },
      endDate: { $gte: startDateObj }
    });
    if (existingBookings.length > 0) {
      return res.status(409).json({ message: 'Already booked, kindly select different date(s)' });
    }

    // Create booking
    const booking = new Booking({
      listingId,
      userId,
      startDate: startDateObj,
      endDate: endDateObj,
      guests
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/bookings?listingId=...
exports.getBookingsByListingId = async (req, res) => {
  try {
    const { listingId } = req.query;
    if (!listingId) return res.status(400).json({ message: 'listingId required' });
    const bookings = await Booking.find({ listingId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 