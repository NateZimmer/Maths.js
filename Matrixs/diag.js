/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');


//Returns the diagonal elements of a matrix; 
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

function make_diag(A)
{
    var M = [];
    var xLocal = Matrixs.make(A);
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
matrix.prototype.diag = function()
{
    var M = matrix_diag(this.value);
    return matrix.make(M);
};


//Add to parent class 
matrix.diag = function(A)
{
    return matrix.make(A).diag();
}


//Add to parent class 
matrix.prototype.makeDiag = function()
{
    var M = make_diag(this.value);
    return matrix.make(M);
};


//Add to parent class 
matrix.makeDiag = function(A)
{
    return matrix.make(A).makeDiag();
}