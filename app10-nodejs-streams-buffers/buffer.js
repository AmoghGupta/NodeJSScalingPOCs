// Pure JavaScript, while great with unicode-encoded strings, does not handle straight binary data very well.
// This is fine on the browser, where most data is in the form of strings.
// However, Node.js servers have to also deal with TCP streams and reading and writing to the filesystem, both of which make it necessary to deal with purely 
// binary streams of data.

//The Buffer class in Node.js is designed to handle raw binary data.
//Each buffer corresponds to some raw memory allocated outside V8. Buffers act somewhat like arrays of integers, but aren't resizable 

//The integers in a buffer each represent a byte 

//************Creating Buffer************

var buffer = Buffer.alloc(8);
console.log(buffer);
// This will print out 8 bytes of zero:
// <Buffer 00 00 00 00 00 00 00 00>

var buffer = Buffer.from([ 8, 6, 7, 5, 3, 0, 9]);
// This will print out 8 bytes of certain values:
// <Buffer 08 06 07 05 03 00 09>
console.log(buffer);

var buffer = Buffer.from("I'm a string!", "utf-8");
// This will print out a chain of values in utf-8:
// <Buffer 49 27 6d 20 61 20 73 74 72 69 6e 67 21>
console.log(buffer);

//************Writing to Buffers************
var buffer = Buffer.alloc(16)
buffer.write("Hello", "utf-8") 
buffer.write(" world!", 5, "utf-8")


//************Reading Buffers************
console.log(buffer.toString('utf-8'));
console.log(buffer.toString("utf-8", 0, 10));