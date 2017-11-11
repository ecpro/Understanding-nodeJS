module.exports = function(l, b, callback) {
    try {
        if(l < 0 || b < 0) {
            throw new Error("Rectangle dimensions should be greater than zero: l = " + l + " and b = " + b);
        }
        else {
            callback(null, {
                area : function () {
                    return l * b;
                },
                perimeter : function() {
                    return 2 * (l + b);
                }
            })
        }
    }
    catch(error) {
        callback(error, null);
    }
}