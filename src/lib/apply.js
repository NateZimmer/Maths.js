var matrix = require('../matrix');

// applies a function to every element of a matrix
function matrix_apply(A,fnc)
{
    var M = [];
    for(var i = 0 ; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j<A[0].length; j++)
        {
            M[i][j] = fnc(A[i][j]);
        }
    }
    return M;
}

//Add to parent class 
matrix.prototype.apply = function(fnc)
{
    if((typeof fnc) != 'function')
    {
        throw 'Must apply a function';
    }
    var M = matrix.make(matrix_apply(this.value,fnc));
    return M;
};

//Add to parent class 
matrix.apply = function(A,fnc)
{
    return matrix.make(A).apply(fnc);
}