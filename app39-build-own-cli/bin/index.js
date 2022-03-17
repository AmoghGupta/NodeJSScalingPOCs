#! /usr/bin/env node

// The first line starting with #! is called a shebang line or a bang line. 
// A shebang line is used to specify the absolute path to the interpreter that will run the below code. 

// for getting params (example add 2 3) and options (example: add --languages)
const yargs = require("yargs");
const usage = "\nUsage: add <num_1> <num_2> to be added";
const utils = require("./utils");

function showHelp() {
    console.log(usage);
    console.log('\nOptions:\r')
    console.log('\t--version\t      ' + 'Show version number.' + '\t\t' + '[boolean]\r')
    console.log('    -d, --datatypes\t' + '      ' + 'List all supported datatypes.' + '\t\t' + '[boolean]\r')
    console.log('\t--help\t\t      ' + 'Show help.' + '\t\t\t' + '[boolean]\n')
}

function showAll() {
    let languages = new Map();
    languages.set('datatype1', 'integer');
    languages.set('datatype2', 'float');
    for (let [key, value] of languages) {
        console.log(key + " : " + value)
    }
}

// if d or datatypes sent as options 
if (yargs.argv.d == true || yargs.argv.datatypes == true) {
    showAll();
    return;
}

// if any number is not passed as param
if (yargs.argv._[0] == null || yargs.argv._[1] == null || yargs.argv._.length > 2) {
    showHelp();
    return;
}

var adder = utils.adder(yargs.argv._[0], yargs.argv._[1]);
console.log(adder);