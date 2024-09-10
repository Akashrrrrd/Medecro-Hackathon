const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); // Make sure the path is correct

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new patient
router.post('/', async (req, res) => {
  const patient = new Patient({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    contact: req.body.contact,
    address: req.body.address,
    medicalHistory: req.body.medicalHistory,
  });

  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
