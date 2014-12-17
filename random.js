/* Copyright 2014 Adam Cook */

/**
 *  Random.js
 *
 *  Helper library for generating random numbers and shit.
 *
 *  TODO...
 */
var Random = (function() {
    var random = {};

    random.rangeInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    random.range = function(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    random.chance = function(percentage) {
        return (Math.random() * 100) > percentage ? true : false;
    }

    return random;
}());
