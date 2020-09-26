var U = require('./mUtils');
var matrix = require('../matrix');
var addM = require('./add');


//Subtracts scalar or matrix from a matrix 
function matrix_subtract(A,B)
{
    var M = [];
    var returnVal = 'Dimension Error';

    if(U.isScalar(B))
    {
        B = U.getScalar(B);
        returnVal = addM.matrix_add_scalar(A,-B);
    }else if(U.isScalar(A)){
        A = U.getScalar(A);
        returnVal = addM.matrix_add_scalar(B,-A);  
    }
    else if(U.is2D(A) && U.is2D(B) && U.matrix_compare_size(A,B)) 
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
        throw 'Dimension Error!';
    }
    return returnVal; 
}


/**
 * Subtract a scalar/array/matrix to self
 * @function subtract
 * @param {scalar/array/matrix} x - Adds a scalar/array/matrix to self
 * @returns {matrix}
 * @memberof matrix/add
 */
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

// Overload support
matrix.prototype.__minus = function(x)
{
    return matrix.make(x).subtract(this.value);
}

//var M = matrix_subtract(this.value,matrix.make(x).value);
//return matrix.make(M);
//};

// Scalar overload support  
matrix.numberOverrides.__minus = function(x){
	return matrix.make(x).subtract(this);
}