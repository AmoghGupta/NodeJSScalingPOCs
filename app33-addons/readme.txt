/*** HOW TO RUN C++ ADDON IN NODEJS **/

convert a c++ file to binary node file and then use it


1. create an addon-src folder.
2. create a file called hello.cc (copy code from node website)
3. create a binding.gyp file (copy code from node website)
4. then do a => node install -g node-gyp
5. then go to addon-src directory and run =>> node-gyp configure (this will generate a build folder)
6. then run =>> node-gyp build (this will generate a Release folder)
7. from the release folder copy addon.node (binary compiled node file is created) file and put it in the node_modules 
8. now you can consume like==> const addon = require('addon');


/** HOW DOES REQUIRE WORK */
from node_modules it will try to resolve in this order:
1. something.js, if not found check step2
2. something.json if not found check step3
3. something.node (its a binary node file)


/** HOW DOES MODULE EXPORTS WORK */
variables defined in the module scope are not available outside, they remain internal to that file, only the things that 
we export are available. Before compiling a module node wraps the module code in a function:

in node js terminal run:
=> require('module').wrapper
O/p:
Proxy [
  [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
  ],
  { set: [Function: set], defineProperty: [Function: defineProperty] }
]


this function wrapper keeps the variable limited to that module.

Also you can take an empty file and do console.log(arguments);
you will see the params passed.



