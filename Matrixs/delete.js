/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimatrix.makeerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var u = require('./mUtils');
var matrix = require('./matrixs');

function quick_transpose(A){
    
    var M = []; //Prep new matrix 

    for(var i=0; i<A[0].length; i++)
    {
        M[i]=A.map(function(value,index){return value[i];}); //Gets Column 
    }
    return M;
}

function matrix_delete_row(A,rowNum)
{
    var M = u.matrix_copy(A);
    M.splice(rowNum,1);
    return M; 
}

function matrix_delete_rows(A,start,end)
{
    var M = u.matrix_copy(A);
    var startIndex = start; 
    var numberDelete = end - start +1; 
    for(var i =0; i < numberDelete; i++)
    {
        M = matrix_delete_row(M,startIndex);
    }
    return M; 
}


function matrix_delete_column(A,colNum)
{
    var M = quick_transpose(A);
    M.splice(colNum,1);
    M = quick_transpose(M);
    return M; 
}

//Add to parent class 
matrix.prototype.deleteRow = function(rowNum)
{
    var M = matrix_delete_row(this.value,rowNum);
    return matrix.make(M);
};

//Add to parent class 
matrix.deleteRow = function(A,rowNum)
{
    return matrix.make(A).deleteRow(rowNum);
}

matrix.prototype.deleteRows = function(start,end)
{
    var M = matrix_delete_rows(this.value,start,end);
    return matrix.make(M);
};

//Add to parent class 
matrix.deleteRows = function(A,start,end)
{
    return matrix.make(A).deleteRows(start,end);
}

//Add to parent class 
matrix.prototype.deleteCol = function(colNum)
{
    var M = matrix_delete_column(this.value,colNum);
    return matrix.make(M);
};

//Add to parent class 
matrix.deleteCol = function(A,colNum)
{
    return matrix.make(A).deleteCol(colNum);
}