var MyEmitter = require("./myEmitter");

var emitter = new MyEmitter();

emitter.on("greet", function() {
  console.info("hi there");
});

emitter.on("no-greet", function() {
  console.info("fuck off");
});

console.log(emitter);

emitter.emit("greet");
emitter.emit("no-greet");
