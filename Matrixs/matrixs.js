

var U = require('./mUtils');


//Default constructor for Matrix  
var matrixs = function(M)
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
    else if(U.isMatrixs(M))
    {
        this.value = M.value;
    }
    this.name ='Matrixs';
    
    return this;
    
};


//Short hand for making a new matrix 
matrixs.make = function(M)
{
    return (new matrixs(M));
}

console.log('Loading matrix');

module.exports = matrixs;