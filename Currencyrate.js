// models/CurrencyRate.js

const mongoose = require("mongoose");

const currencyRateSchema = new mongoose.Schema({
  currencyCode: {
    type: String,    
    unique: true,
  },
  rate: { 
    type: Number, 
    required: true },
});

const CurrencyRate = mongoose.model("CurrencyRate", currencyRateSchema);

module.exports = CurrencyRate;
