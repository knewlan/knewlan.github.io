const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
   name: { type: String, required: true },
   upc: { type: String, required: true, unique: true },
   quantity: { type: Number, required: true },
   description: { type: String }
   //Add additional fields here for future needs
});

module.exports = mongoose.model('Item', itemSchema);