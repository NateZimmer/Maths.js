var matrix = require('../matrix');

//Returns the diagonal elements of a matrix; 
/*
function matrix_diag(A){
    var M = []; //Prep new matrix 

    for(var i=0; i<A.length;i++)
    {
        M[i] = [];
        for(var j = 0; j <A.length; j++)
        {
            M[i][j] =  (i==j) ? A[i][j] : 0; 
        }
    }
    return M;
}
*/

function make_diag(A)
{
    var M = [];
    var xLocal = matrix.make(A);
    if(xLocal.shape()[0]<xLocal.shape()[1])
    {
        xLocal = xLocal.transpose();
    }
    xLocal = xLocal.value;

    for(var i = 0; i < xLocal.length; i++)
    {
        M[i]= [];
        for(var j = 0; j < xLocal.length; j++)
        {
            var diagVal = (i==j) ? xLocal[i][0] : 0;
            M[i][j] = diagVal;
        }
    }
    return M;
}

//Add to parent class 
/**
 * Converts a column/row matrix into a diagonal 2d matrix 
 * @function diag
 * @returns {matrix}
 * @memberof matrix/other
 * @example
 * var M = require('./src/matrix_lib');
 * console.log(M.range(3).diag().print());
 * //0.000           0.000           0.000
 * //0.000           1.000           0.000
 * //0.000           0.000           2.000
 */
matrix.prototype.diag = function()
{
    var M = make_diag(this.value);
    return matrix.make(M);
};


//Add to parent class 
matrix.diag = function(A)
{
    return matrix.make(A).diag();
}

