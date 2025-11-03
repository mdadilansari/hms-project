const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();

app.use(bodyParser.json());

let payments = [];

// Load payments data from CSV file on startup
fs.createReadStream('hms_payments.csv')
  .pipe(csv())
  .on('data', (row) => payments.push(row))
  .on('end', () => console.log('Loaded payments data.'));

app.get('/payments', (req, res) => {
  res.json(payments);
});

app.get('/payments/:id', (req, res) => {
  const payment = payments.find(p => p.payment_id === req.params.id);
  if (payment) {
    res.json(payment);
  } else {
    res.status(404).json({ error: 'Payment not found' });
  }
});

app.listen(3005, () => {
  console.log('Payments service running on http://localhost:3005');
});