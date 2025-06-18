const Listing = require('../models/Listing');

// Get all listings
exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single listing by ID
exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new listing
exports.createListing = async (req, res) => {
  try {
    const listing = new Listing(req.body);
    const savedListing = await listing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a listing
exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a listing
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search listings
exports.searchListings = async (req, res) => {
  try {
    const {
      location,
      guests,
      minPrice,
      maxPrice,
      bedrooms,
      rating
    } = req.query;

    const query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (guests) {
      query.guests = { $gte: parseInt(guests) };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    if (bedrooms) {
      query.bedrooms = { $gte: parseInt(bedrooms) };
    }
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    const listings = await Listing.find(query);
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 