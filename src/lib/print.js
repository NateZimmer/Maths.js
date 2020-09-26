var matrix = require('../matrix');

//Print matrix 
function print_matrix(M)
{
    var nRows = M.length;
    var nColumns = M[0].length;
    var textString = '';

    for(var i=0; i<nRows; i+=1 )
    {
        for(var j = 0; j <nColumns; j++)
        {
            textString += M[i][j].toFixed(3)+'\t\t';
        }
        textString = textString.substr(0,textString.length-2); // Remove extra
        textString += '\n';
    }
    textString = textString.substr(0,textString.length-1); // Remove extra line return 
    return textString;
}


/**
 * Flattens / unrolls a matrix from 2d to 1d
 * @function print
 * @returns {string}
 * @memberof matrix/other
 */  
matrix.prototype.print = function()
{
    return print_matrix(this.value);
};


//Gets a text string of the matrix 
matrix.print = function(M)
{
    return print_matrix(matrix.make(M).value);
};

//Gets a text string of the matrix 
matrix.prototype.print = function()
{
    return print_matrix(this.value);
};


//Gets a text string of the matrix 
matrix.prototype.toString = function()
{
    return print_matrix(this.value);
};