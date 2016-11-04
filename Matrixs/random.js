/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');

function matrix_rand(m,n)
{
    var M = [];
    
    for(var i = 0 ; i <m; i++)
    {
        M[i] = [];
        for(var j = 0; j<n; j++)
        {
            M[i][j] =Math.random();
        }
    }
    
    return M;
}
	
//http://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function randn()
{
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function matrix_randn(m,n)
{
    var M = [];
    
    for(var i = 0 ; i <m; i++)
    {
        M[i] = [];
        for(var j = 0; j<n; j++)
        {
            M[i][j] =randn();
        }
    }
    
    return M;
}
	

//Add to parent class 
matrix.rand = function(m,n)
{
    return matrix.make(matrix_rand(m,n));
}



//Add to parent class 
matrix.randn = function(m,n)
{
    return matrix.make(matrix_randn(m,n));
}