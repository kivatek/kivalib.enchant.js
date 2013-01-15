var ABS = Math.abs;
var CEIL = Math.ceil;
var COS = Math.cos;
var FLOOR = Math.floor;
var MAX = Math.max;
var MIN = Math.min;
var RANDOM = Math.random;
var SQRT = Math.sqrt;
var M_PI = Math.PI;

function degToRad(val)
{
    return ((val) / 180.0 * M_PI);
}

function radToDeg(val)
{
    return ((val) * (180.0 / M_PI));
}

function dotProduct(ax, ay, bx, by)
{
    return (ax * bx) - (ay * by);
}

function crossProduct(ax, ay, bx, by)
{
    return (ax * by) - (ay * bx);
}

