var matrix = require('../matrix');
require('./shape');

//Returns the diagonal elements of a matrix; 
function matrix_element_divide(A,B){

    var M = []; 

    for(var i=0; i<A.length;i++)
    {
        M[i] = [];
        for(var j = 0; j <A[0].length; j++)
        {
            M[i][j] =  A[i][j]/B[i][j]; 
        }
    }
    return M;
}


//Add to parent class 
matrix.prototype.divide = function(B)
{

    var shapeA = this.shape();
    var shapeB = B.shape();
    var M = [];

    if(shapeA.equals(shapeB))
    {
        M = matrix_element_divide(this.value,B.value);
    }
    else
    {
        throw 'element wise division is currently only supported. Matricies must be same shape' 
    } 

    return matrix.make(M);
};


//Add to parent class 
matrix.divide = function(A,B)
{
    return matrix.make(A).divide(matrix.make(B));
}