/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');


// Returns Transpose of matrix
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


//Add to parent class 
matrix.prototype.pow = function(val)
{
    var M = matrix_pow(this.value,val);
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


//Add to parent class 
matrix.square = function(A,val)
{
    return matrix.make(A).square(val);
}