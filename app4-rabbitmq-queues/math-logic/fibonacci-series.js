const calculateFibonacciValue = function(n){
    if (n < 2){
      return 1;
    } else {
      return calculateFibonacciValue(n - 2) + calculateFibonacciValue(n - 1);
    }
  }

  module.exports = {calculateFibonacciValue};