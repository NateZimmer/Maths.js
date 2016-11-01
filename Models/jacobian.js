/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimatrix.makeerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

//Calculates numerical jacobian 

var eps = 1e-8;

require('../Matrixs/matrix');

function numJacobian(X,modelObj)
{
    var J = [];
    var currParam = modelObj.param.slice();
    var currX = modelObj.fnc(X);
    
    for(var j =0; j < modelObj.param.length; j++)
    {
        modelObj.param[j] = modelObj.param[j] + eps; 
        J[j] = [];
        for(var i = 0; i < X.length; i++)
        {
            var newX = modelObj.fnc([X[i]])[0][0];
            var oldX = currX[i][0];
            J[j][i] = (newX - oldX)/eps;    
        }
        modelObj.param = currParam;
    }
    return Matrixs.transpose(J);
}

module.exports = numJacobian; 