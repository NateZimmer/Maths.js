var matrix = require('../matrix');

// Returns Transpose of matrix
function matrix_transpose(M){
    // Rows should be columns, columns become rows 
    var M_Tranpose = []; //Prep new matrix 
    var M_N = M[0].length; // Matrix N columns Value; 
    if(M_N == undefined) // Case of row vector
    {
        M_N = 1;
    }
    
    for(var i=0; i<M_N;i++){
        //M_Tranpose.push(M.map(function(value,index){return value[i];})); //Gets column of original matrix
        M_Tranpose[i]=M.map(function(value,index){return value[i];}); //Gets Column 
    }
    return M_Tranpose;
}


//Add to parent class 
matrix.prototype.transpose = function()
{
    var M = matrix_transpose(this.value);
    return matrix.make(M);
};

matrix.prototype.t = function()
{
    var M = matrix_transpose(this.value);
    return matrix.make(M);
};

//Add to parent class 
matrix.transpose = function(A)
{
    return matrix.make(A).transpose();
}

matrix.t = function(A)
{
    return matrix.make(A).transpose();
}