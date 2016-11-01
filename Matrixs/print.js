/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');


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


//Gets a text string of the matrix 
matrix.prototype.print = function()
{
    return print_matrix(this.value);
};


//Gets a text string of the matrix 
matrix.print = function(M)
{
    return print_matrix(matrix.make(M).value);
};
