const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(express.static('static'));

app.get('/cart-total', (req, res) => {
  // Added comma after '/cart-total'
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal); // Default to 0 if cartTotal is not provided
  let total = cartTotal + newItemPrice; // Initialize total
  res.send(total.toString());
});

app.get('/membership-discount', (req, res) => {
  // Added comma after '/cart-total'
  let total = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember; // Default to 0 if cartTotal is not provided
  if (isMember) {
    total = total - total / 10;
  }

  res.send(total.toString());
});

app.get('/calculate-tax', (req, res) => {
  // Added comma after '/cart-total'
  let total = parseFloat(req.query.cartTotal);

  let tax = total / 20;

  res.send(tax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  // Added comma after '/cart-total'
  let shippingMethod = req.query.shippingMethod;
  let distance = req.query.distance;
  let finaldistance;

  if (shippingMethod == 'express') {
    finaldistance = distance / 100;
  }
  if (shippingMethod == 'standard') {
    finaldistance = distance / 50;
  }

  res.send(finaldistance.toString());
});

app.get('/shipping-cost', (req, res) => {
  // Retrieve weight and distance from query parameters
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  // Calculate cost
  let cost = weight * distance * 0.1;

  res.send(cost.toString());
});

app.get('/loyalty-points', (req, res) => {
  // Retrieve weight and distance from query parameters
  let purchaseAmount = req.query.purchaseAmount;


  // Calculate cost
  let loyaltypoints = purchaseAmount * 2;

  res.send(loyaltypoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
