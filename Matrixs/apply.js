/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');

// applies a function to every element of a matrix
function matrix_apply(A,fnc)
{
    var M = [];
    for(var i = 0 ; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j<A[0].length; j++)
        {
            M[i][j] = fnc(A[i][j]);
        }
    }
    return M;
}

//Add to parent class 
matrix.prototype.apply = function(fnc)
{
    if((typeof fnc) != 'function')
    {
        throw 'Must apply a function';
    }
    var M = matrix.make(matrix_apply(this.value,fnc));
    return M;
};

//Add to parent class 
matrix.apply = function(A,fnc)
{
    return matrix.make(A).apply(fnc);
}