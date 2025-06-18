const mongoose = require("mongoose");

const OpeningSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true
  },
  requirements: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['open', 'closed', 'pending'],
    default: 'open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  jobName: { type: String, required: true },
  customQuestions: { type: [String], required: true },
  skills: [
    {
      name: { type: String, required: true }
    },
  ],
  assignedManager: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    allowContact: { type: Boolean, required: true },
  },
  maxQuestions: { type: Number, required: true },
  minutePerQuestion: { type: Number, required: true },
  difficultyLevel: { type: String, required: true },
  candidateLanguage: { type: String, required: true },
  contact: { type: String, required: true },
  interviewSettings: {
    codeEditorRequired: { type: Boolean, required: true },
    enableVirtualAvatar: { type: Boolean, required: true },
    allowMobileInterview: { type: Boolean, required: true }
  },
}, { timestamps: true });

// Update the updatedAt timestamp before saving
OpeningSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Opening", OpeningSchema);
