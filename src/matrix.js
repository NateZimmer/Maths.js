var U = require('./lib/mUtils');


//Default constructor for Matrix  
var matrix = function(M)
{
    if(U.is2D(M))
    {
        this.value = M;
    }
    else if(U.isScalar(M))
    {
        this.value = [[M]];
    }
    else if(U.is1D(M))
    {
        this.value = [M];
    }
    else if(U.isMatrix(M))
    {
        this.value = M.value;
    }
    this.name ='matrix';
    
    return this;

};

//Short hand for making a new matrix 
matrix.make = function(M)
{
    return (new matrix(M));
}

matrix.numberOverrides = {};

module.exports = matrix;