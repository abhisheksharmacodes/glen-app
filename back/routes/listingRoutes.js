const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', listingController.getAllListings);
router.get('/search', listingController.searchListings);
router.get('/:id', listingController.getListingById);

// Protected routes (require authentication)
router.post('/', auth, listingController.createListing);
router.put('/:id', auth, listingController.updateListing);
router.delete('/:id', auth, listingController.deleteListing);

module.exports = router; 