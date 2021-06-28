const express = require('express');
const fibObj = require('./math-logic/fibonacci-series');

const app = express();
app.get('/', (req, res) => {
  let number = fibObj.calculateFibonacciValue(
    Number.parseInt(req.query.number)
  );
  res.send(`<h1>${number}</h1>`);
});

app.listen(3000, () => console.log('Express server is running on port 3000'));