/**
 * @classdesc A library for multiplying a scalar/array/matrix to a scalar/array/matrix. This library will always return matrix type.   
 * @class matrix/multiply
 * @hideconstructor
 */
var u = require('./mUtils');
var matrix = require('../matrix');


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
    var M = [];

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


//Matrix element wise multiplication 
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


//Higher level multiply function 
function matrix_multiply(A,B)
{
    var returnVal = 0;
    var bIsScalar = u.isScalar(B);
    var aIsScalar = u.isScalar(A);
    var matrixSameSize = u.matrix_compare_size(A,B);

    if(bIsScalar)
    {
        B = u.getScalar(B);
        returnVal = matrix_multiplyc(A,B);	
    }else if(aIsScalar){
        A = u.getScalar(A);
        returnVal = matrix_multiplyc(B,A);	
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

/**
 * Add a scalar/array/matrix to self
 * @method multiply
 * @param {scalar/array/matrix} x - Multiplies a scalar/array/matrix to self
 * @returns {matrix}
 * @memberof matrix/multiply
 * @example // Add a scalar to a matrix
 * var M = require('./src/matrix_lib'); // or require('math-script')
 * var A = M.ident(2,2); // Create a matrix 
 * A = A.multiply(3); // multiply scalar
 * console.log(A.print())
 * //Result 
 * //3.000           0.000
 * //0.000           3.000
 * 
 * // Perform a matrix dot product
 * var B = M.make([[1,2],[3,4]);
 * B = B.multiply(B)  
 * console.log(B.print())
 * //Result
 * //7.000           10.000
 * //15.000          22.000
 * @example
 * // Use in execute environment  
 * var M = require('./src/matrix_lib'); // or require('math-script')
 * M.execute(function(M){
 * 
 * var A = M.make([[1,2],[3,4]]); // Create a 2x2 matrix
 * var B = (A*A)*3 + 1; // Perform op on matrices and scalars
 * console.log(B.print())
 * 
 * });
 * //Result
 * //22.000          31.000
 * //46.000          67.000
 * 
 */
matrix.multiply = function(A,B)
{
    return new matrix(matrix_multiply(matrix.make(A).value,matrix.make(B).value));
}

//Add prototype to parent class 
matrix.prototype.multiply = function(x){
    var M = matrix_multiply(this.value,matrix.make(x).value);
    return matrix.make(M);
}

// Overload support
matrix.prototype.__multiply = function(x)
{
    var M = matrix_multiply(matrix.make(x).value,this.value,);
    return matrix.make(M);
};

// Scalar overload support  
matrix.numberOverrides.__multiply = function (x) {
    return matrix.make(x).multiply(this);
};




