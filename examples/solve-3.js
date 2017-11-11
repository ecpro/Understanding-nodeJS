var argv = require('yargs')
            .usage('Usage: node $0 --l[num]  --b[num]')
            .demand(['l', 'b'], 'Enter the length and breath')
            .argv;

var rect = require('./rectangle-2');

function solveRect(l, b) {
    console.log("Solving for rectangle with l = "
        + l + " and b = " + b);
    rect(l, b, function (error, rectangle) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("The area of a rectangle of dimensions length = "
                + l + " and breadth = " + b + " is " + rectangle.area());
            console.log("The perimeter of a rectangle of dimensions length = "
                + l + " and breadth = " + b + " is " + rectangle.perimeter());
        }
    });

}

solveRect(argv.l, argv.b);