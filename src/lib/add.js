/**
 * @classdesc A library for adding a scalar/array/matrix to a scalar/array/matrix. This library will always return matrix type.   
 * @class matrix/add
 * @hideconstructor
 */

var U = require('./mUtils');
var matrix = require('../matrix');

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


//Generic add function that handles matrix or scalar 
function matrix_add(A,B)
{
		var M = [];
		var returnVal = 'Dimension Error';

		if(U.isScalar(B))
		{
			B = U.getScalar(B);
			returnVal = matrix_add_scalar(A,B);
		}else if(U.isScalar(A)){
			A = U.getScalar(A);
			returnVal = matrix_add_scalar(B,A);
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
			throw 'Dimension Error!';
		}
		return returnVal; 
}

//Add static method  
matrix.add = function(A,B)
{
    return new matrix(matrix_add(matrix.make(A).value,matrix.make(B).value));
}

/**
 * Add a scalar/array/matrix to self
 * @function add
 * @param {scalar/array/matrix} x - Adds a scalar/array/matrix to self
 * @returns {matrix}
 * @memberof matrix/add
 * @example // Add a scalar to a matrix
 * var M = require('./src/matrix_lib'); // or require('math-script')
 * var A = M.zeros(2,2); // Create 2x2 matrix of zeros
 * A = A.add(1); // Add scalar
 * console.log(A.print())
 * //Result 
 * //1.000           1.000
 * //1.000           1.000
 * 
 * // Add a matrix to a matrix
 * var B = M.ident(2,2).add(A) // Add "A" to a 2x2 identity matrix
 * console.log(B.print())
 * //Result
 * //2.000           1.000
 * //1.000           2.000
 * @example
 * // Use add in execute environment  
 * var M = require('./src/matrix_lib'); // or require('math-script')
 * M.execute(function(M){
 * 
 * var A = M.make([[1,2],[3,4]]); // Create a 2x2 matrix
 * var B = A + A + 1; // Add matrices and scalars together 
 * console.log(B.print())
 * 
 * });
 * //Result
 * //3.000           5.000
 * //7.000           9.000
 */
matrix.prototype.add = function(x)
{
    var M = matrix_add(this.value,matrix.make(x).value);
    return matrix.make(M);
};

matrix.prototype.__plus = function(x)
{
    var M = matrix_add(this.value,matrix.make(x).value);
    return matrix.make(M);
};

// Scalar overload support
matrix.numberOverrides.__plus = function(x){
	return matrix.make(x).add(this);
}