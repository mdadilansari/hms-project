const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();

app.use(bodyParser.json());

let prescriptions = [];

// Load prescriptions data from CSV file on startup
fs.createReadStream('hms_prescriptions.csv')
  .pipe(csv())
  .on('data', (row) => prescriptions.push(row))
  .on('end', () => console.log('Loaded prescriptions data.'));

app.get('/prescriptions', (req, res) => {
  res.json(prescriptions);
});

app.get('/prescriptions/:id', (req, res) => {
  const prescription = prescriptions.find(p => p.prescription_id === req.params.id);
  if (prescription) {
    res.json(prescription);
  } else {
    res.status(404).json({ error: 'Prescription not found' });
  }
});

app.listen(3006, () => {
  console.log('Prescriptions service running on http://localhost:3006');
});