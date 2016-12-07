
var U = require('./mUtils');
require('./transpose');
require('./flatten');
require('./shape');
var matrix = require('./matrixs');

var nullShiftValue = NaN; //Shift in NaN to make it obvious what data is invalid 

function lag_matrix(A,start,end)
{
    var M = [];
    var Y = matrix.make(A).transpose().flatten(); // Converts to 1D row vector;
    var shifts = (end - start)+1;
    var iStart = start; 

    for(var i = 0; i < shifts; i++)
    {
        var yCopy = Y.slice(); 
        for(var j = 0; j <iStart; j++)
        {
            yCopy.unshift(nullShiftValue);
            yCopy.pop();
        }
        iStart++; 
        M.push(yCopy);
    }
    M = matrix.make(M).transpose().value; // Convert back to column array 
    return M;

}


function lag_matrix_trim(A,start,end)
{
    var M = [];
    var Y = matrix.make(A).transpose().flatten(); // Converts to 1D row vector;
    var shifts = (end - start)+1;
    var iStart = start; 

    for(var i = 0; i < shifts; i++)
    {
        var yCopy = Y.slice(); 
        for(var j = 0; j <iStart; j++)
        {
            yCopy.unshift(nullShiftValue);
            yCopy.pop();
        }
        iStart++; 
        M.push(yCopy);
    }
    M = matrix.make(M).transpose().value; // Convert back to column array

    for(var i = 0; i < end; i++)
    {
        M.shift();
    }

    return M;
}


matrix.prototype.lag = function(start,end)
{
    var M = lag_matrix(this.value,start,end);
    return matrix.make(M);
};

matrix.lag = function(A,start,end)
{
    return new matrix(matrix.make(A).lag(start,end));
}


matrix.prototype.lagTrim = function(start,end)
{
    var M = lag_matrix_trim(this.value,start,end);
    return matrix.make(M);
};


matrix.lagTrim = function(A,start,end)
{
    return new matrix(matrix.make(A).lagTrim(start,end));
}
