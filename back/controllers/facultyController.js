const Faculty = require('../models/faculty');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// Get faculty by ID
exports.getFaculty = async (req, res) => {
    const { facultyId } = req.query;

    if (!facultyId) {
        return res.status(400).json({ message: "facultyId is required" });
    }

    try {
        const faculty = await Faculty.find({ facultyId });
        return res.status(200).json({
            message: "Faculties fetched successfully",
            data: faculty,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching faculty",
            error: error.message,
        });
    }
};

// Create new faculty
exports.createFaculty = async (req, res) => {
    try {
        const { name, email, password, campusId, department, position } = req.body;

        if (!name || !email || !password || !campusId || !department || !position) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if faculty already exists
        const existingFaculty = await Faculty.findOne({ $or: [{ email }, { campusId }] });
        if (existingFaculty) {
            return res.status(400).json({ message: "Faculty with this email or campus ID already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const faculty = new Faculty({
            name,
            email,
            password: hashedPassword,
            campusId,
            department,
            position
        });

        await faculty.save();
        
        const facultyData = { 
            name: faculty.name, 
            email: faculty.email, 
            id: faculty._id,
            department: faculty.department,
            position: faculty.position
        };
        
        res.status(201).json({ 
            message: 'Faculty created successfully', 
            data: facultyData 
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: "Validation Error", errors: errorMessages });
        }
        return res.status(500).json({ message: 'Error creating faculty', error: error.message });
    }
};

// Login faculty
exports.loginFaculty = async (req, res) => {
    const { email, password, campusId } = req.body;
    try {
        const faculty = await Faculty.findOne({ email, campusId });
        
        if (!faculty) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, faculty.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { facultyId: faculty._id },
            config.get('jwtSecret'),
            { expiresIn: '24h' }
        );
        
        const facultyData = { 
            name: faculty.name, 
            email: faculty.email, 
            id: faculty._id,
            department: faculty.department,
            position: faculty.position
        };
        
        res.status(200).json({ 
            message: 'Login successful', 
            token,
            facultyData 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

// Update faculty
exports.updateFaculty = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;
        
        // If password is being updated, hash it
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedFaculty = await Faculty.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (!updatedFaculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        const facultyData = { 
            name: updatedFaculty.name, 
            email: updatedFaculty.email, 
            id: updatedFaculty._id,
            department: updatedFaculty.department,
            position: updatedFaculty.position
        };

        return res.status(200).json({ 
            message: 'Faculty updated successfully', 
            data: facultyData 
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Error updating faculty", 
            error: error.message 
        });
    }
}; 