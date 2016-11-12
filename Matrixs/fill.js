/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');
require('./transpose');

// Changes from 1D to 2D: 
function matrix_fill(M,m,n)
{
    var mElements = M.length * M[0].length;
    var outElements = m*n;
    var fill = [];
    var v = 0;
    if(mElements != outElements)
    {
        throw 'Invalid Fill container';
    }

    for(var i = 0; i < m; i++)
    {
        fill[i] = [];
        for(var j = 0; j < n; j++ )
        {
            fill[i][j] = M[0][v];
            v++;  
        }
    }
    return fill; 
}

//Add to parent class 
matrix.prototype.fill = function(m,n)
{
    if(this.value.length>this.value[0].length) // If is column vector, transpose it. 
    {
        this.value = this.transpose().value;
    }

    var M = matrix_fill(this.value,m,n);
    return matrix.make(M);
};

//Add to parent class 
matrix.fill = function(A,m,n)
{
    return matrix.make(A).fill(m,n);
}