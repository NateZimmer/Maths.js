var u = require('./mUtils');
var matrix = require('../matrix');

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


function matrixs_decimate(A,decNumber)
{
    var M = [];
    var deci = (decNumber ==0) ? 1 : decNumber;

    for(var i = 0; i <A.length; i++)
    {
        if(i % decNumber == 0)
        {
            M.push(A[i])
        }
    }
    return M;
}

matrix.prototype.decimate = function(decNumber)
{
    var M = matrixs_decimate(this.value,decNumber);
    return matrix.make(M);
};

matrix.decimate = function(A,decNumber)
{
    return matrix.make(A).decimate(decNumber);
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