var arg = require('minimist')(process.argv.slice(2), { string : "name", });

//var name = process.argv[2];
var name = arg.name;

console.log('hello ' + name);