const express = require('express');
const router = express.Router();
const MedicalTest = require('../models/MedicalTest');

// Get all medical tests
router.get('/', async (req, res) => {
  try {
    const tests = await MedicalTest.find().populate('patientId');
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a medical test by ID
router.get('/:id', async (req, res) => {
  try {
    const test = await MedicalTest.findById(req.params.id).populate('patientId');
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new medical test
router.post('/', async (req, res) => {
  const test = new MedicalTest(req.body);
  try {
    const newTest = await test.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a medical test
router.patch('/:id', async (req, res) => {
  try {
    const updatedTest = await MedicalTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a medical test
router.delete('/:id', async (req, res) => {
  try {
    await MedicalTest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Medical test deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
