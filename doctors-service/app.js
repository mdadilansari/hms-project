const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();

app.use(bodyParser.json());

let doctors = [];

// Load doctors data from CSV file on startup
fs.createReadStream('hms_doctors.csv')
  .pipe(csv())
  .on('data', (row) => doctors.push(row))
  .on('end', () => console.log('Loaded doctors data.'));

app.get('/doctors', (req, res) => {
  res.json(doctors);
});

app.get('/doctors/:id', (req, res) => {
  const doctor = doctors.find(p => p.doctor_id === req.params.id);
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).json({ error: 'Doctor not found' });
  }
});

app.listen(3004, () => {
  console.log('Doctors service running on http://localhost:3004');
});