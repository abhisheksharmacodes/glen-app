const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 1
  },
  beds: {
    type: Number,
    required: true,
    min: 1
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 1
  },
  images: [{
    type: String,
    required: true
  }],
  description: {
    main: {
      type: String,
      required: true
    },
    features: [{
      icon: String,
      text: String
    }]
  },
  host: {
    name: {
      type: String,
      required: true
    },
    yearsHosting: {
      type: Number,
      required: true,
      min: 0
    },
    avatar: {
      type: String,
      required: true
    }
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    default: '₹'
  },
  coordinates: {
    long: {
      type: Number,
      required: true
    },
    lat: {
      type: Number,
      required: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Listing', listingSchema); 