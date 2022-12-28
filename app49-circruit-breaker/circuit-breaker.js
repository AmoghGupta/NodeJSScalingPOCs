
const Opossum = require('opossum');


function createBreaker(makeRequest, config){
    const circuitBreaker = new Opossum(makeRequest, config);
    
    circuitBreaker.on('open', () => {
        console.log('Circuit breaker is open');
    });
    
    circuitBreaker.on('close', () => {
        console.log('Circuit breaker is closed');
    });
    
    circuitBreaker.on('halfOpen', () => {
        console.log('Circuit breaker is half-open');
    });
    return circuitBreaker;
}




module.exports = createBreaker;