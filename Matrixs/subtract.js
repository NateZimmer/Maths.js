

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