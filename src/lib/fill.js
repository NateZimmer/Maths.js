var matrix = require('../matrix');
require('./transpose');

// Changes from 1D to 2D: 
function matrix_fill(M,m,n)
{
    var mElements = M.length * M[0].length;
    var outElements = m*n;
    var fill = [];
    var v = 0;
    if(mElements != outElements)
    {
        throw 'Invalid Fill container';
    }

    for(var i = 0; i < m; i++)
    {
        fill[i] = [];
        for(var j = 0; j < n; j++ )
        {
            fill[i][j] = M[0][v];
            v++;  
        }
    }
    return fill; 
}

//Add to parent class 
matrix.prototype.fill = function(m,n)
{
    if(this.value.length>this.value[0].length) // If is column vector, transpose it. 
    {
        this.value = this.transpose().value;
    }

    var M = matrix_fill(this.value,m,n);
    return matrix.make(M);
};

//Add to parent class 
matrix.fill = function(A,m,n)
{
    return matrix.make(A).fill(m,n);
}