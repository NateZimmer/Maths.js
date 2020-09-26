//This is a clobber file of basic primitive funcitons such as a matrix mean, sum, min, max...ect 
var u = require('./mUtils');
var matrix = require('../matrix');

//Find mean of matrix: [1,2,3] --> 2
function matrix_mean(A)
{
    var merge = [].concat.apply([],A); // flatten array 
    var lengthM = merge.length; 
    var meanM = 0; 
    for(var i = 0; i <lengthM; i++)
    {
        meanM += merge[i];
    }
    return (meanM/lengthM);
}

// Changes from 2D to 1D: [[1,2,3]] --> [1,2,3]
function matrix_flatten(M)
{
    return ([].concat.apply([], M));
}

//Find max of array: [1,2,3] --> 3
function getMaxOfArray(numArray) {
	  return Math.max.apply(null, matrix_flatten(numArray));
}
	
//Find min of array: [1,2,3] --> 1
function getMinOfArray(numArray) {
    return Math.min.apply(null, matrix_flatten(numArray));
}

//Find sum of array: [1,2,3] --> 6
function getSumOfMatrix(matrixInput)
{
    return matrix_flatten(matrixInput).reduce(function(a, b) { return a + b; }, 0);
}

//Find sum of array: [1,2,3] --> 6
function getRMSOfMatrix(matrixInput)
{
    var M = matrix_flatten(matrixInput); 
    for(var i = 0; i < M.length; i++)
    {
        M[i] = M[i]*M[i];
    }
    return Math.sqrt(getSumOfMatrix(M)/M.length); 

}

//Returns the max dimension: 2x50 --> 50
function matrix_length(M)
{
    return matrix.max(matrix.shape(M));
}

//Rounds matrix: [1,2,3.3] --> [1,2,3]
function matrix_round(A,d)
{
    var d = -1 * d;
    var M = [];
    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j < A[0].length; j++)
        {
            M[i][j] = Math.round10(A[i][j],d);	
        }
    }
    return M;
}


// Add functions to parent class 
matrix.prototype.mean = function()
{
    return matrix_mean(this.value);
};

matrix.mean = function(x)
{
    return matrix_mean(matrix.make(x).value)
}

matrix.prototype.rms = function()
{
    return getRMSOfMatrix(this.value);
};

matrix.rms = function(x)
{
    return getRMSOfMatrix(matrix.make(x).value)
}

/**
 * Returns the minimal value of a matrix
 * @function min
 * @returns {double}
 * @memberof matrix/other
 */
matrix.prototype.min = function()
{
    return getMinOfArray(this.value);
};

matrix.min = function(x)
{
    return getMinOfArray(matrix.make(x).value)
}

/**
 * Returns the max value of a matrix
 * @function max
 * @returns {double}
 * @memberof matrix/other
 */
matrix.prototype.max = function(x)
{
    return getMaxOfArray(this.value);
};

matrix.max = function(x)
{
    return getMaxOfArray(matrix.make(x).value)
}

/**
 * Returns the sum of a matrix
 * @function sum
 * @returns {double}
 * @memberof matrix/other
 */
matrix.prototype.sum = function()
{
    return getSumOfMatrix(this.value);
};

matrix.sum = function(x)
{
    return getMaxOfArray(matrix.make(x).value)
}

/**
 * Returns the max dimension of a matrix 
 * @function length
 * @returns {int}
 * @memberof matrix/other
 */
matrix.prototype.length = function()
{
    return matrix_length(this.value);
};

// Javascript not allowing over-ride of length? 
matrix.len = function(x)
{
    return matrix_length(matrix.make(x).value);
};

matrix.prototype.unroll = function()
{
    return matrix_flatten(this.value);
};

matrix.round = function(A,d)
{
    return matrix.make(matrix_round(matrix.make(A).value,d));
}

/**
 * Returns the matrix rounded to the specified decimal place 
 * @function round
 * @param d - decimal precision 
 * @returns {int}
 * @memberof matrix/other
 */
matrix.prototype.round = function(d)
{
    var M = matrix_round(this.value,d);
    return matrix.make(M);
};

function matrix_fit(A,B)
{
    var M1 = matrix.make(A);
    var M2 = matrix.make(B);

    var denom = M1.subtract(M1.mean()).rms();
    var num = M1.subtract(M2).rms();
    var fitness = 100*(1 - num/denom);
    return fitness; 
}

matrix.prototype.fitness = function(A)
{
    var fit = matrix_fit(this,Matrixs.make(A));
    return fit;
};
