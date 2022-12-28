// this is specific to machine..
// in some machines 1 core can run 2 threads at a time
// in some machine it runs only 1 thread a time


// gives the number of cores (or in simpler terms number of CPUS)
// const os = require('os')
// const cpuCount = os.cpus().length
// console.log("CPU Cores "+cpuCount); 

// lets say you have 10 cores which means for best performance you can run 10 parallel threads.
// if you run threads more than that then the performance will be impact because now the existing 10 cores
// will share extra load between them, so lets say if it was taking X time earlier now it would take more than 
// X time.


// Updating thread pool size of libuv by default its 4.
// process.env.UV_THREADPOOL_SIZE = 2;
process.env.UV_THREADPOOL_SIZE = 10;


const crypto = require('crypto');

const start =  Date.now();

// calculates hash
crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
    console.log('1:', Date.now()-start);
});

crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
    console.log('2:', Date.now()-start);
});

crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
    console.log('3:', Date.now()-start);
});

crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
    console.log('4:', Date.now()-start);
});

crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
    console.log('5:', Date.now()-start);
});
crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
    console.log('6:', Date.now()-start);
});
crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
    console.log('7:', Date.now()-start);
});
crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
    console.log('8:', Date.now()-start);
});
crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
    console.log('9:', Date.now()-start);
});
crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
    console.log('10:', Date.now()-start);
});
// crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
//     console.log('11:', Date.now()-start);
// });
// crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
//     console.log('12:', Date.now()-start);
// });
// crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
//     console.log('13:', Date.now()-start);
// });
// crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
//     console.log('14:', Date.now()-start);
// });
// crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
//     console.log('15:', Date.now()-start);
// });
// crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
//     console.log('16:', Date.now()-start);
// });
// crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
//     console.log('17:', Date.now()-start);
// });
// crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
//     console.log('18:', Date.now()-start);
// });
// crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
//     console.log('19:', Date.now()-start);
// });
// crypto.pbkdf2('a','b',100000, 512, 'sha512', ()=>{
//     console.log('20:', Date.now()-start);
// });

