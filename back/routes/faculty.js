const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
const auth = require('../middleware/auth');

// GET /faculty?facultyId=yourJobId
router.get("/", facultyController.getFaculty);

// POST /faculty
router.post('/', facultyController.createFaculty);

// POST /faculty/login
router.post('/login', facultyController.loginFaculty);

// PUT /faculty/:id
router.put('/:id', auth, facultyController.updateFaculty);

module.exports = router;