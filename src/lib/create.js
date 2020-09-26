/**
 * @classdesc Matrix creation utilities 
 * @class matrix/create
 * @hideconstructor
 */
var U = require('./mUtils');
var matrix = require('../matrix');


function range(min,step,max)
{
    var M = [[]];
    var steps = 1; 
    var maxs = 0; 
    var increment = 1;
    
    if((typeof step)== 'undefined')
    {
        steps = min;
        min = 0;
    }
    else if((typeof max) == 'undefined')
    {
        maxs = step;
        steps = Math.floor(maxs - min)+1;
    }
    else
    {
        increment = step;
        steps = Math.floor((max - min)/step)+1;
    }
    
    for(var i = 0 ; i < steps; i++)
    {
        M[i] = [];
        M[i][0]= min+increment*i; 
    }
    
    return M; 
}


function matrix_zeros(rows,cols)
{
    var M=[];

    if((typeof cols)== 'undefined')
    {
        cols = 1; 
    }

    for(var i = 0; i<rows;i++)
    {
        M[i]=[];
        for(var j=0; j<cols;j++)
        {
            M[i].push(0);
        }
    }
    return M;
}


function matrix_ones(rows,cols)
{
    var M=[];

    if((typeof cols)== 'undefined')
    {
        cols = 1; 
    }

    for(var i = 0; i<rows;i++)
    {
        M[i]=[];
        for(var j=0; j<cols;j++)
        {
            M[i].push(1);
        }
    }
    return M;
}


function matrix_ident(m,n)
{

    var M = [];

    if((typeof n)== 'undefined')
    {
        n = m; 
    }

    for(var i = 0 ; i <m; i++)
    {
        M[i] = [];
        for(var j = 0; j<n; j++)
        {
            var val = (i==j) ? 1 : 0;
            M[i][j] =val;
        }
    }
    return M;
}


matrix.prototype.clone = function()
{
    return matrix.make(U.matrix_copy(this.value));
}

/**
 * Creates a copy/clone of a matrix.
 * @function clone
 * @param {matrix} A - Matrix
 * @returns {matrix}
 * @memberof matrix/create
 * @example 
 * var A = new M([[1,2,3,4]]);
 * var B = A.copy()
 */ 
matrix.clone = function(A)
{
    return matrix.make(A).clone();
}

/**
 * Returns a column vector specified by min, step, max
 * @function range
 * @param {int} min - Starting point
 * @param {int} step - Increment between min and max
 * @param {int} max - End point of array. 
 * @returns {matrix}
 * @memberof matrix/create
 * @example 
 * M.range(5).print(); // res: 0.000\n1.000\n2.000\n3.000\n4.000
 * @example
 * M.range(0,2,10); // res: '0.000\n2.000\n4.000\n6.000\n8.000\n10.000'
 */ 
matrix.range = function(min,step,max)
{
    return matrix.make(range(min,step,max));
}

/**
 * Returns a matrix filled with 1s specified by `m` and `n`.
 * @function ones
 * @param {int} m - columns
 * @param {int} n - rows
 * @returns {matrix}
 * @memberof matrix/create
 * @example 
 * M.ones(2,2).print();  
 * //1.000           1.000
 * //1.000           1.000
 */ 
matrix.ones = function(m,n)
{
    return matrix.make(matrix_ones(m,n));
}

/**
 * Returns an identity matrix specified by `m` and `n`.
 * @method ident
 * @param {int} m - columns
 * @param {int} n - rows
 * @returns {matrix}
 * @memberof matrix/create
 * @example 
 * M.ident(2,2).print(); 
 * //1.000           0.000
 * //0.000           1.000
 */ 
matrix.ident = function(m,n)
{
    return matrix.make(matrix_ident(m,n));
}

/**
 * Returns a matrix of zeros specified by `m` and `n`.
 * @function zeros
 * @param {int} m - columns
 * @param {int} n - rows
 * @returns {matrix}
 * @memberof matrix/create
 * @example 
 * M.zeros(2,2).print(); 
 * //0.000           0.000
 * //0.000           0.000
 */ 
matrix.zeros = function(m,n)
{
    return matrix.make(matrix_zeros(m,n));
}