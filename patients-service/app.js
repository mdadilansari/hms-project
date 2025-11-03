const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();

app.use(bodyParser.json());

let patients = [];

// Load patients data from CSV file on startup
fs.createReadStream('hms_patients.csv')
  .pipe(csv())
  .on('data', (row) => patients.push(row))
  .on('end', () => console.log('Loaded patients data.'));

app.get('/patients', (req, res) => {
  res.json(patients);
});

app.get('/patients/:id', (req, res) => {
  const patient = patients.find(p => p.patient_id === req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

app.listen(3001, () => {
  console.log('Patients service running on http://localhost:3001');
});