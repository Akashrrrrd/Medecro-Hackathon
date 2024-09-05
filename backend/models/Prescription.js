const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  medication: [{ name: String, dosage: String }],
  date: Date,
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
