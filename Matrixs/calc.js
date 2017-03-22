/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');

//Numerical Derivative 
function matrix_difference(A)
{
	var M = [];
	for(var i = 1; i < A.length; i++)
	{
		M[i-1] = [];
		M[i-1][0] = A[i][0] - A[i-1][0];
	}
	return M;
}


//Numerical Integral 
function matrix_sum(A)
{
	var M = [];
	for(var i = 1; i < A.length; i++)
	{
		M[i-1] = [];
		M[i-1][0] = A[i][0] + A[i-1][0];
	}
	return M;
}


//Add to parent class 
matrix.prototype.differences = function()
{
    var M = matrix_difference(this.value);
    return matrix.make(M);
};

//Add to parent class 
matrix.differences = function(A)
{
    return matrix.make(A).differences();
}


//Add to parent class 
matrix.prototype.sums = function()
{
    var M = matrix_sum(this.value,lb,ub);
    return matrix.make(M);
};


//Add to parent class 
matrix.sums = function(A)
{
    return matrix.make(A).sums();
}