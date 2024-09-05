const mongoose = require('mongoose');

const medicalTestSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  testName: String,
  result: String,
  date: Date,
});

module.exports = mongoose.model('MedicalTest', medicalTestSchema);
