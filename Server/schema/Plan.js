  const mongoose = require('mongoose');

  const PlanSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    prices: {
      price1Month: { type: Number, required: true },
      price3Months: { type: Number, required: true },
      price6Months: { type: Number, required: true },
      price12Months: { type: Number, required: true },
    },
  });

  module.exports = mongoose.model('Plan', PlanSchema);
