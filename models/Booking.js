const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event',
  },
  qrCode: {
    type: String,
    required: true,
  },
  scanned: {
    type: Boolean,
    default: false,
  },
  scannedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('booking', BookingSchema);