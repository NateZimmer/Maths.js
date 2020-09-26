var matrix = require('../matrix');
require('./stats');


function matrix_rand(m,n)
{

    if((typeof n) == 'undefined')
    {
        n = 1; 
    }

    var M = [];
    
    for(var i = 0 ; i <m; i++)
    {
        M[i] = [];
        for(var j = 0; j<n; j++)
        {
            M[i][j] =Math.random();
        }
    }
    
    return M;
}
	

//http://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function randn()
{
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function matrix_randn(m,n)
{
    var M = [];
    
    if((typeof n) == 'undefined')
    {
        n = 1; 
    }

    for(var i = 0 ; i <m; i++)
    {
        M[i] = [];
        for(var j = 0; j<n; j++)
        {
            M[i][j] =randn();
        }
    }
    
    return M;
}

function addNoise(A,noiseLevel)
{
    var M = [];
    var maxValue = matrix.make(A).max();

    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j < A[0].length; j++)
        {
            M[i][j] = A[i][j] +(maxValue*noiseLevel*Math.random() - maxValue*noiseLevel/2);
        }
    }
    return M;
}

function addNormalNoise(A,noiseLevel)
{
    var M = [];
    var maxValue = matrix.make(A).max();

    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j < A[0].length; j++)
        {
            M[i][j] = A[i][j] +(maxValue*noiseLevel*randn() - maxValue*noiseLevel/2);
        }
    }
    return M;
}


//Add to parent class 
matrix.prototype.addNoise = function(noiseLevel)
{
    return matrix.make(addNoise(this.value,noiseLevel));
};

matrix.prototype.addNormalNoise = function(noiseLevel)
{
    return matrix.make(addNormalNoise(this.value,noiseLevel));
};


//Add to parent class 
matrix.rand = function(m,n)
{
    return matrix.make(matrix_rand(m,n));
}

matrix.random = function(m,n)
{
    return matrix.make(matrix_rand(m,n));
}

//Add to parent class 
matrix.randn = function(m,n)
{
    return matrix.make(matrix_randn(m,n));
}