const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ },  // 24-hour format time validation (HH:MM)
  phone: { type: String, required: true, match: /^[0-9]{10}$/ },  // Phone number validation
});

module.exports = mongoose.model('Appointment', appointmentSchema);
