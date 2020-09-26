/**
 * @classdesc A collection of matrix utility functions 
 * @class matrix/other
 * @hideconstructor
 */

var matrix = require('../matrix');

function matrix_check_bounds(A,lb,ub)
{
    var M = []; 
    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j < A[0].length; j++)
        {
            M[i][j] = (Math.round10(A[i][j],-4)>ub) ? 1 : (Math.round10(A[i][j],-4)<lb) ? -1 : 0;
        }
    }
    return M; 
}

/*
function matrix_clamp(A,lb,ub)
{
    var M = []; 
    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j < A[0].length; j++)
        {
            M[i][j] = (Math.round10(A[i][j],-4)>ub) ? ub : (Math.round10(A[i][j],-4)<lb) ? lb : A[i][j];
        }
    }
    return M; 
}
*/

/**
 * Returns a element-wise matrix checking each element against upper and lower bound.
 * <ul>
 * <li>0, no bound violation</li>
 * <li>-1, lower bound violation</li>
 * <li>1, upper bound violation </li>
 * </ul>
 * @function checkBounds
 * @param {double} lb - Lower bound
 * @param {double} ub - Upper bound 
 * @returns {matrix}
 * @memberof matrix/other
 * @example 
 * var M = require('./src/matrix_lib');
 * var A = new M([[1,2,3,4]]);
 * console.log(A.checkBounds(1.5,2.5).print());
 * // Result 
 * //-1.000  0.000  1.000  1.000
 */ 
matrix.prototype.checkBounds = function(lb,ub)
{
    var M = matrix_check_bounds(this.value,lb,ub);
    return matrix.make(M);
};

//Add to parent class 
matrix.checkBounds = function(A,lb,ub)
{
    return matrix.make(A).checkBounds(lb,ub);
}