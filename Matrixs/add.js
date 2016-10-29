

var U = require('./mUtils');
var matrix = require('./matrixs');


//Add a scalar to a matrix 
function matrix_add_scalar(A,c)
{
		var M = [];
		
        for(var i = 0; i < A.length; i++)
        {
            M[i] = [];
            for(var j = 0; j< A[0].length; j++)
            {
                M[i][j] = A[i][j] + c;

            }
        }

		return M;
}
module.exports.matrix_add_scalar = matrix_add_scalar;


//Generic add funciton that handles matrix or scalar 
function matrix_add(A,B)
{
		var M = [];
		var returnVal = 'Dimension Error';

		var bIsScalar = false; 

		if(U.isScalar(B))
		{
			B = U.getScalar(B);
			returnVal = matrix_add_scalar(A,B);
		}
		else if(U.is2D(A) && U.is2D(B) && U.matrix_compare_size(A,B)) 
		{
			for(var i =0; i<A.length; i++)
			{
				M[i] = [];
				for(var j = 0; j<A[0].length;j++)
				{
					M[i][j] = A[i][j]+B[i][j];
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
matrix.add = function(A,B)
{
    return new matrix(matrix_add(matrix.make(A).value,matrix.make(B).value));
}


//Add prototype to parent class 
matrix.prototype.add = function(x)
{
    var M = matrix_add(this.value,matrix.make(x).value);
    return matrix.make(M);
};

