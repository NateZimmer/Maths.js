/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

// Model of the form: m*x +b || param[0]*x + param[1]

function lineObj(x)
{
    this.param = x; //paramters 
};

lineObj.type = 'line';

// Evaluate function for a array of points 
lineObj.prototype.fnc = function(x)
{
    var M = [];
    for(var i = 0; i < x.length; i++)
    {
        M[i] = [ this.param[0] * x[i][0] + this.param[1]] ; // y = a*x + b 
    }
    return M;   
}

//Get Gradient array of points  
lineObj.prototype.grad = function(x)
{
    var M = [];

    for(var i = 0; i < x.length; i++)
    {
        M[i] = [x[i][0] , 1];
    }
    return M; 
}

module.exports = lineObj;  