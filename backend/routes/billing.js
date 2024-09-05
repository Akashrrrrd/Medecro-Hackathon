const express = require('express');
const router = express.Router();
const Billing = require('../models/Billing');

// Get all bills
router.get('/', async (req, res) => {
  try {
    const bills = await Billing.find().populate('patientId');
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a bill by ID
router.get('/:id', async (req, res) => {
  try {
    const bill = await Billing.findById(req.params.id).populate('patientId');
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new bill
router.post('/', async (req, res) => {
  const bill = new Billing(req.body);
  try {
    const newBill = await bill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a bill
router.patch('/:id', async (req, res) => {
  try {
    const updatedBill = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a bill
router.delete('/:id', async (req, res) => {
  try {
    await Billing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bill deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
