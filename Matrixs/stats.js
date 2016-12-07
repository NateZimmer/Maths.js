/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

//This is a clobber file of basic primitive funcitons such as a matrix mean, sum, min, max...ect 
var u = require('./mUtils');
var matrix = require('./matrixs');


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

//Finds the number of elements of a array: 50x50 --> 2500
function matrix_length(M)
{
    return matrix_flatten(M).length;
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

matrix.prototype.rms = function()
{
    return getRMSOfMatrix(this.value);
};

matrix.prototype.min = function()
{
    return getMinOfArray(this.value);
};

matrix.prototype.max = function(x)
{
    return getMaxOfArray(this.value);
};

matrix.prototype.sum = function()
{
    return getSumOfMatrix(this.value);
};

matrix.prototype.length = function()
{
    return matrix_length(this.value);
};

matrix.prototype.unroll = function()
{
    return matrix_flatten(this.value);
};

matrix.round = function(A,d)
{
    return matrix.make(matrix_round(matrix.make(A).value,d));
}

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
