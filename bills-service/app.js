const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();

app.use(bodyParser.json());

let bills = [];

// Load bills data from CSV file on startup
fs.createReadStream('hms_bills.csv')
  .pipe(csv())
  .on('data', (row) => bills.push(row))
  .on('end', () => console.log('Loaded bills data.'));

app.get('/bills', (req, res) => {
  res.json(bills);
});

app.get('/bills/:id', (req, res) => {
  const bill = bills.find(p => p.bill_id === req.params.id);
  if (bill) {
    res.json(bill);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

app.listen(3003, () => {
  console.log('Bills service running on http://localhost:3003');
});