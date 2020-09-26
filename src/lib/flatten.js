var matrix = require('../matrix');

// Changes from 2D to 1D: [[1,2,3]] --> [1,2,3]
function matrix_flatten(M)
{
    return ([].concat.apply([], M));
}

/**
 * Flattens / unrolls a matrix from 2d to 1d
 * @function flatten
 * @returns {array}
 * @memberof matrix/other
 * @example 
 * var M = require('./src/matrix_lib');
 * var A = new M([[1,2],[3,4]]);
 * A.flatten()
 * // res: [ 1, 2, 3, 4 ]
 */  
matrix.prototype.flatten = function()
{
    var M = matrix_flatten(this.value);
    return M;
};

//Add to parent class 
matrix.flatten = function(A)
{
    return matrix.make(A).flatten();
}