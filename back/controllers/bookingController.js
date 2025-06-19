const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const User = require('../models/User');

// Helper: Check for date overlap
function isOverlap(start1, end1, start2, end2) {
  return (start1 <= end2) && (end1 >= start2);
}

// POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { listingId, startDate, endDate, guests } = req.body;
    const userId = req.user.userId;

    // Validate listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    // Validate guests
    if (guests < 1 || guests > listing.guests) {
      return res.status(400).json({ message: `Guests must be between 1 and ${listing.guests}` });
    }

    // Check for overlapping bookings
    const existingBookings = await Booking.find({
      listingId,
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) }
    });
    if (existingBookings.length > 0) {
      return res.status(409).json({ message: 'already booked, kindly select different date(s)' });
    }

    // Create booking
    const booking = new Booking({
      listingId,
      userId,
      startDate,
      endDate,
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