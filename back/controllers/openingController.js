const Opening = require('../models/Opening');

// Create a new opening
exports.createOpening = async (req, res) => {
  try {
    const opening = new Opening(req.body);
    await opening.save();
    res.status(201).json(opening);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all openings
exports.getOpenings = async (req, res) => {
  try {
    const openings = await Opening.find();
    res.json(openings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single opening by ID
exports.getOpening = async (req, res) => {
  try {
    const opening = await Opening.findById(req.params.id);
    if (!opening) {
      return res.status(404).json({ message: 'Opening not found' });
    }
    res.json(opening);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get openings by faculty ID
exports.getOpeningsByFacultyId = async (req, res) => {
  try {
    const openings = await Opening.find({ facultyId: req.params.facultyId });
    res.json(openings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an opening
exports.updateOpening = async (req, res) => {
  try {
    const opening = await Opening.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!opening) {
      return res.status(404).json({ message: 'Opening not found' });
    }
    res.json(opening);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an opening
exports.deleteOpening = async (req, res) => {
  try {
    const opening = await Opening.findByIdAndDelete(req.params.id);
    if (!opening) {
      return res.status(404).json({ message: 'Opening not found' });
    }
    res.json({ message: 'Opening deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 