const Booking = require('../models/Booking');
const QRCode = require('qrcode');

exports.createBooking = async (req, res) => {
  try {
    const qrCodeData = JSON.stringify({
      userId: req.user.id,
      eventId: req.params.eventId,
      bookingId: new mongoose.Types.ObjectId(),
    });

    const qrCode = await QRCode.toDataURL(qrCodeData);

    const newBooking = new Booking({
      user: req.user.id,
      event: req.params.eventId,
      qrCode,
    });

    const booking = await newBooking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      'event',
      ['name', 'date', 'location']
    );
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.scanTicket = async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'worker') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  const { qrCodeData } = req.body;

  try {
    const { bookingId } = JSON.parse(qrCodeData);
    let booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    if (booking.scanned) {
      return res.status(400).json({ msg: 'Ticket already scanned' });
    }

    booking.scanned = true;
    booking.scannedBy = req.user.id;
    await booking.save();

    res.json({ msg: 'Ticket scanned successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};