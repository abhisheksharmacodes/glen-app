const express = require("express");
const router = express.Router();
const openingController = require("../controllers/openingController");
const auth = require("../middleware/auth");

// Protected routes - require authentication
router.post("/", auth, openingController.createOpening);
router.put("/:id", auth, openingController.updateOpening);
router.delete("/:id", auth, openingController.deleteOpening);

// Public routes
router.get("/", openingController.getOpenings);
router.get("/:id", openingController.getOpening);
router.get("/faculty/openings", openingController.getOpeningsByFacultyId);

module.exports = router;
