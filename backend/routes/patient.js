const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve patients', error: err.message });
  }
});

// Get a patient by ID
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve patient', error: err.message });
  }
});

// Create a new patient
router.post('/', async (req, res) => {
  const patient = new Patient(req.body);
  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create patient', error: err.message });
  }
});

// Update a patient
router.patch('/:id', async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update patient', error: err.message });
  }
});

// Delete a patient
router.delete('/:id', async (req, res) => {
  try {
    const result = await Patient.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Patient not found' });const express = require('express');
      const router = express.Router();
      const Patient = require('../models/Patient'); // Make sure the path is correct
      
      // Get all patients
      router.get('/', async (req, res) => {
        try {
          const patients = await Patient.find(); // Fetch all patients from the database
          res.json(patients); // Return the patients as JSON
        } catch (err) {
          res.status(500).json({ message: err.message }); // Return error if something goes wrong
        }
      });
      
      // Add a new patient
      router.post('/', async (req, res) => {
        // Create a new patient instance using the request body data
        const patient = new Patient({
          name: req.body.name,
          age: req.body.age,
          gender: req.body.gender,
          contact: req.body.contact,
          address: req.body.address,
          medicalHistory: req.body.medicalHistory,
        });
      
        try {
          const newPatient = await patient.save(); // Save the new patient to the database
          res.status(201).json(newPatient); // Return the newly created patient as JSON
        } catch (err) {
          res.status(400).json({ message: err.message }); // Return error if something goes wrong
        }
      });
      
      module.exports = router; // Export the router to be used in the main server file
      
    }
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete patient', error: err.message });
  }
});

module.exports = router;

