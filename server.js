const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Evento Backend is running...');
});


// Connect Database
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


const Event = require('./models/Event'); // make sure you have an Event model

app.get('/test-db', async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
