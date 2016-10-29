/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');


// Returns Transpose of matrix
function matrix_transpose(M){
    // Rows shoudl be columns, columns become rows 
    var M_Tranpose = []; //Prep new matrix 
    var M_N = M[0].length; // Matrix N columns Value; 
    if(M_N == undefined) // Case of row vector
    {
        M_N = 1;
    }
    
    for(var i=0; i<M_N;i++){
        //M_Tranpose.push(M.map(function(value,index){return value[i];})); //Gets column of original matrix
        M_Tranpose[i]=M.map(function(value,index){return value[i];}); //Gets Column 
    }
    return M_Tranpose;
}


//Add to parent class 
matrix.prototype.transpose = function()
{
    var M = matrix_transpose(this.value);
    return matrix.make(M);
};


//Add to parent class 
matrix.transpose = function(A)
{
    return matrix.make(A).transpose();
}