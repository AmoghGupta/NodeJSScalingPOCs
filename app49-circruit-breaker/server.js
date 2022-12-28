var express = require('express');
var app = express();
const axios = require('axios');
const circuitBreakerFunction = require('./circuit-breaker');

app.get('/', async function (req, res) {
    // circuit breaker will have a timeout of 3 seconds, and 
    // will trip (open the circuit) if more than 50% of requests result in an error
    // Once the circuit is open, it will remain open for 30 seconds before transitioning to the half-open state, at which point it will allow a single request to pass through in order to determine if the service has recovered. 
    // If the request succeeds, the circuit will close; otherwise, it will trip again.
    const config = {
        timeout: 3000,
        errorThresholdPercentage: 50,
        resetTimeout: 30000
    };
    try {
        const breaker = circuitBreakerFunction(axios.get('http://localhost:8082/server2'),config);
        const response = await breaker.fire();
        console.log(response.data);
        res.send(response.data);
      } catch (err) {
        console.error(err);
        res.send(`<p>Failed with ${err}`);
      }
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});