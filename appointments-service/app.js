const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();

app.use(bodyParser.json());

let appointments = [];

// Load appointments data from CSV file on startup
fs.createReadStream('hms_appointments.csv')
  .pipe(csv())
  .on('data', (row) => appointments.push(row))
  .on('end', () => console.log('Loaded appointments data.'));

app.get('/appointments', (req, res) => {
  res.json(appointments);
});

app.get('/appointments/:id', (req, res) => {
  const appointment = appointments.find(p => p.appointment_id === req.params.id);
  if (appointment) {
    res.json(appointment);
  } else {
    res.status(404).json({ error: 'Appointment not found' });
  }
});

app.listen(3002, () => {
  console.log('Appointments service running on http://localhost:3002');
});