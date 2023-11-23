const mongoose = require("mongoose");

const whatsAppSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  received: {
    type: Boolean,
    required: true,
  },
});

module.exports = new mongoose.model("messagecontents", whatsAppSchema);
