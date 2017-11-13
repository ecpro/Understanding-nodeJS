function MyEmitter() {
  this.events = {};
}

MyEmitter.prototype.on = function(type, listener) {
  /* if type property exist on event object then get that property else
    initialise it to a new array.
   */
  this.events[type] = this.events[type] || [];
  this.events[type].push(listener);
};

MyEmitter.prototype.emit = function(type) {
    if(this.events[type]) {
        this.events[type].forEach(function(listener) {
            listener();
        });
    }
}

module.exports = MyEmitter;