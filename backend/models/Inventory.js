const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: Number,
  unitPrice: Number,
});

module.exports = mongoose.model('Inventory', inventorySchema);
