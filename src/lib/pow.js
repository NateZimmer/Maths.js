/**
 * @classdesc Compute the exponent of matrices 
 * @class matrix/exponent 
 * @hideconstructor
 */

var matrix = require('../matrix');


function matrix_pow(A,val){
    
    var M = []; 

    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j< A[0].length; j++)
        {
            M[i][j] = Math.pow(A[i][j],val);
        }
    }

    return M;
}

function matrix_square(A){
    
    var M = []; 

    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j< A[0].length; j++)
        {
            M[i][j] = Math.pow(A[i][j],2);
        }
    }

    return M;
}


/**
 * Calculate a matrix to the exponent of `x`
 * @function pow
 * @memberof matrix/exponent
 * @param {int} x - Exponent power 
 * @returns {matrix}
 * @example 
 * // Invert a non-singular matrix 
 * var M = require('./src/matrix_lib');
 * var A = new M([[1,2,3],[4,5,6],[7,8,5]]); // non singular matrix
 * console.log(A.invert().print());
 * // result: 
 * //-1.917          1.167           -0.250
 * //1.833           -1.333          0.500
 * //-0.250          0.500           -0.250
 * @example 
 * // Execution environment example 
 * var M = require('./src/matrix_lib');
 * M.execute(function(M){
 * var X = M.range(0,0.1,10); // Create input 
 * var Y = -1.3*X**2 + 13*X + -5*X + 30;
 * console.log(Y.print());
 * console.log(Y.size());
 * })
 */
matrix.prototype.pow = function(x)
{
    var M = matrix_pow(this.value,x);
    return matrix.make(M);
};


//Add to parent class 
matrix.pow = function(A,val)
{
    return matrix.make(A).pow(val);
}


//Add to parent class 
matrix.prototype.square = function(val)
{
    var M = matrix_square(this.value);
    return matrix.make(M);
};

matrix.prototype.__exponent = function(x){
    return matrix.make(this.value).pow(x);
}

//Add to parent class 
matrix.square = function(A,val)
{
    return matrix.make(A).square(val);
}

matrix.numberOverrides.__exponent = function(x){
    return matrix.make(x).pow(this);
}
