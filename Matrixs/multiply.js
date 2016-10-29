/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var u = require('./mUtils');
var matrix = require('./matrixs');


// Is multiply valid? e.g. is A.n == B.m 
function isMatrixMultiplyValid(A,B)
{
    var returnVal = false;
    var demA = u.matrix_demension(A);
    var demB = u.matrix_demension(B);

    if(demA[1] == demB[0])
    {
        returnVal = true;
    }
    return returnVal;
}


//Matrix multiply constant 
function matrix_multiplyc(A,c)
{
    M = [];

    if((typeof A[0][0]) != 'undefined')
    {
        for(var i =0; i<A.length; i++)
        {
            M[i] = [];
            for(var j = 0; j<A[0].length;j++)
            {
                M[i][j] = A[i][j]*c;
            }
        }
    }
    else
    {
        for(var i =0; i<A.length; i++)
        {
            M[i] = A[i]*c;
        }
    }
    return M;
}


//Matrix dot product 
function matrix_dot(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}


//Matrix element wise multiplicaiton 
function matrix_multiply_same(A,B)
{
    var M = []; 

    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j< A[0].length; j++)
        {
            M[i][j] = A[i][j] * B[i][j];
        }
    }

    return M;
}


//Higher level multiply funciton 
function matrix_multiply(A,B)
{
    var returnVal = 0;
    var bIsScalar = u.isScalar(B);
    var matrixSameSize = u.matrix_compare_size(A,B);

    if(bIsScalar)
    {
        B = u.getScalar(B);
        returnVal = matrix_multiplyc(A,B);	
    }
    else if(isMatrixMultiplyValid(A,B))
    {
        returnVal = matrix_dot(A,B);
    }
    else if(matrixSameSize)
    {
        returnVal = matrix_multiply_same(A,B);
    }
    else
    {
        returnVal = 'Invalid';
    }

    return returnVal;
}


//Add to parent class 
matrix.prototype.multiply = function(x)
{
    var M = matrix_multiply(this.value,matrix.make(x).value);
    return matrix.make(M);
};


//Add to parent class 
matrix.multiply = function(A,B)
{
    return new matrix(matrix_multiply(matrix.make(A).value,matrix.make(B).value));
}