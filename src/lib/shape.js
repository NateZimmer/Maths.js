/**
 * @classdesc Utilities for re-shaping matrices 
 * @class matrix/shaping
 * @hideconstructor
 */
var u = require('./mUtils');
var matrix = require('../matrix');


function matrix_cat_horizontal(A,B)
{
    var M = [];
    
    if(A.length != B.length)
    {
        throw 'Must have same number of rows'
    }			
    
    M = u.matrix_copy(A);
    for(var i =0; i<M.length;i++) // for rows of M
    {
        M[i] = M[i].concat(B[i]);
    }
    return M;
}


function matrix_push(A,B)
{
    var aColumns = A[0].length;
    var bColumns = B[0].length;
    var M = u.matrix_copy(A);
    
    if(aColumns != bColumns)
    {
        throw 'Column size must be the same';
    }
    
    for(var i =0; i < B.length; i++)
    {
        M.push(B[i]);
    }
    return M;
}


function matrix_get_columns(A,start,end)
{
    var M = [];
    var m = A.length; 
    var startPoint = start; 
    var length = 1; 
    if(typeof end != 'undefined')
    {
        length += end - start; 
    }
    
    for(var i = 0; i <m; i++)
    {
        M[i] = [];
        for(var j = 0; j < length; j++)
        {
            M[i][j] = A[i][j+startPoint];
        }
    }
    return M;
}


function matrix_get_rows(A,start,end)
{
    var M = [];
    var m = A.length; 
    var startPoint = start; 
    var length = 1; 
    if(typeof end != 'undefined')
    {
        length += end - start; 
    }
    
    for(i = 0; i < length; i++)
    {
        M[i] = A[i+start];
    }
    return M;
}


matrix.prototype.push = function(x)
{
    var M = matrix_push(this.value,matrix.make(x).value);
    return matrix.make(M);
};

matrix.catVertical = function(A,B)
{
    return new matrix(matrix_push(matrix.make(A).value,matrix.make(B).value));
}

matrix.prototype.catVertical = function(x)
{
    var M = matrix_push(this.value,matrix.make(x).value);
    return matrix.make(M);
};	

/**
 * Append/concat a matrix vertically 
 * @function catV
 * @returns {matrix}
 * @memberof matrix/shaping
 * @example
 * var M = require('./src/matrix_lib');
 * var A = M.range(3);
 * console.log(A.catH(A).value) // Show value
 * console.log(A.catH(A).size()) // Show size
 * // Returns 
 * //[ [ 0 ], [ 1 ], [ 2 ], [ 0 ], [ 1 ], [ 2 ] ]
 * //[ 6, 1 ]
 */
matrix.prototype.catV = function(x)
{
    var M = matrix_push(this.value,matrix.make(x).value);
    return matrix.make(M);
};	


matrix.prototype.catHorizontal = function(x)
{
    var M = matrix_cat_horizontal(this.value,matrix.make(x).value);
    return matrix.make(M);
};	

/**
 * Append/concat a matrix horizontally  
 * @function catH
 * @returns {matrix}
 * @memberof matrix/shaping
 * @example
 * var M = require('./src/matrix_lib');
 * var A = M.range(3);
 * console.log(A.catH(A).value) // Show value
 * console.log(A.catH(A).size()) // Show size
 * // Returns 
 * //[ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ] ]
 * //[ 3, 2 ]
 */
matrix.prototype.catH = function(x)
{
    var M = matrix_cat_horizontal(this.value,matrix.make(x).value);
    return matrix.make(M);
};

matrix.catH = function()
{
    var M = matrix.make(arguments[0]);
    for(var i = 1; i < arguments.length; i++){
        M = M.catH(arguments[i]);
    }
    return M;
}

matrix.prototype.shape = function()
{
    return u.matrix_demension(this.value);
};

matrix.shape = function(A)
{
    return u.matrix_demension(matrix.make(A).value);
}

matrix.size = matrix.shape;


/**
 * Returns the size of a matrix as an array [m,n]
 * @function size
 * @returns {matrix}
 * @memberof matrix/shaping
 * @example
 * var M = require('./src/matrix_lib');
 * M.range(3).size()
 * // returns [ 3, 1 ]
 */
matrix.prototype.size = matrix.prototype.shape;

matrix.prototype.columns = function(start,end)
{
    return new matrix(matrix_get_columns(this.value,start,end));
}

matrix.columns = function(A,start,end)
{
    return new matrix(matrix_get_columns(matrix.make(A).value,start,end));
}

matrix.prototype.column = function(m)
{
    return new matrix(matrix_get_columns(this.value,m));
}

matrix.column = function(A,start)
{
    return new matrix(matrix_get_columns(matrix.make(A).value,start));
}

matrix.prototype.rows = function(start,end)
{
    return new matrix(matrix_get_rows(this.value,start,end));
}

matrix.rows = function(A,start,end)
{
    return new matrix(matrix_get_rows(matrix.make(A).value,start,end));
}

matrix.prototype.row = function(start)
{
    return new matrix(matrix_get_rows(this.value,start));
}

matrix.row = function(A,start)
{
    return new matrix(matrix_get_rows(matrix.make(A).value,start));
}