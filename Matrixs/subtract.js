/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var u = require('./mUtils');
var matrix = require('./matrixs');
var addM = require('./add');


//Subtracts scalar or matrix from a matrix 
function matrix_subtract(A,B)
{
    var M = [];
    var returnVal = 'Dimension Error';

    if(u.isScalar(B))
    {
        B = u.getScalar(B);
        returnVal = addM.matrix_add_scalar(A,-B);
    }
    else if(u.is2D(A) && u.is2D(B) && u.matrix_compare_size(A,B)) 
    {
        for(var i =0; i<A.length; i++)
        {
            M[i] = [];
            for(var j = 0; j<A[0].length;j++)
            {
                M[i][j] = A[i][j]-B[i][j];
            }
            returnVal = M;  
        }
    }
    else
    {
        throw 'Demension Error!';
    }
    return returnVal; 
}


//Add to parent class 
matrix.prototype.subtract = function(x)
{
    var M = matrix_subtract(this.value,matrix.make(x).value);
    return (new matrix(M));
};


//Add prototype to parent class 
matrix.subtract = function(A,B)
{
    return new matrix(matrix_subtract(matrix.make(A).value,matrix.make(B).value));
}