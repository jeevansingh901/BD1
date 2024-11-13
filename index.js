const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice) || 0;
  let cartTotal = parseFloat(req.query.cartTotal) || 0;
  let total = cartTotal + newItemPrice;
  console.log(`New Item Price: ${newItemPrice}, Cart Total: ${cartTotal}, Total: ${total}`);
  res.send(total.toString());
});

app.get('/membership-discount', (req, res) => {
  let total = parseFloat(req.query.cartTotal) || 0;
  let isMember = req.query.isMember === 'true'; // Ensures it's a boolean
  if (isMember) {
    total = total - total / 10;
  }
  console.log(`Total after discount (if applicable): ${total}`);
  res.send(total.toString());
});

app.get('/calculate-tax', (req, res) => {
  let total = parseFloat(req.query.cartTotal) || 0;
  let tax = total / 20;
  console.log(`Tax: ${tax}`);
  res.send(tax.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod || 'standard';
  let distance = parseFloat(req.query.distance) || 0;
  let finalDistance;

  if (shippingMethod === 'express') {
    finalDistance = distance / 100;
  } else if (shippingMethod === 'standard') {
    finalDistance = distance / 50;
  } else {
    res.status(400).send('Invalid shipping method');
    return;
  }

  console.log(`Estimated delivery time: ${finalDistance}`);
  res.send(finalDistance.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight) || 0;
  let distance = parseFloat(req.query.distance) || 0;
  let cost = weight * distance * 0.1;
  console.log(`Shipping Cost: ${cost}`);
  res.send(cost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount) || 0;
  let loyaltyPoints = purchaseAmount * 2;
  console.log(`Loyalty Points: ${loyaltyPoints}`);
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
