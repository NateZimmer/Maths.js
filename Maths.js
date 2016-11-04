(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var U = require('./mUtils');
var matrix = require('./matrixs');


//Add a scalar to a matrix 
function matrix_add_scalar(A,c)
{
		var M = [];
		
        for(var i = 0; i < A.length; i++)
        {
            M[i] = [];
            for(var j = 0; j< A[0].length; j++)
            {
                M[i][j] = A[i][j] + c;

            }
        }

		return M;
}
module.exports.matrix_add_scalar = matrix_add_scalar;


//Generic add funciton that handles matrix or scalar 
function matrix_add(A,B)
{
		var M = [];
		var returnVal = 'Dimension Error';

		var bIsScalar = false; 

		if(U.isScalar(B))
		{
			B = U.getScalar(B);
			returnVal = matrix_add_scalar(A,B);
		}
		else if(U.is2D(A) && U.is2D(B) && U.matrix_compare_size(A,B)) 
		{
			for(var i =0; i<A.length; i++)
			{
				M[i] = [];
				for(var j = 0; j<A[0].length;j++)
				{
					M[i][j] = A[i][j]+B[i][j];
				}
				returnVal = M;  
			}
		}
		else
		{
			throw 'Demension Error!';
		}
		return returnVal; 
}


//Add to parent class 
matrix.add = function(A,B)
{
    return new matrix(matrix_add(matrix.make(A).value,matrix.make(B).value));
}


//Add prototype to parent class 
matrix.prototype.add = function(x)
{
    var M = matrix_add(this.value,matrix.make(x).value);
    return matrix.make(M);
};


},{"./mUtils":8,"./matrixs":10}],2:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimatrix.makeerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

//Shows which elements of a matrix are over a lower or upper bound 
var matrix = require('./matrixs');

function matrix_check_bounds(A,lb,ub)
{
    var M = []; 
    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j < A[0].length; j++)
        {
            M[i][j] = (Math.round10(A[i][j],-4)>ub) ? 1 : (Math.round10(A[i][j],-4)<lb) ? -1 : 0;
        }
    }
    return M; 
}

//Add to parent class 
matrix.prototype.checkBounds = function(lb,ub)
{
    var M = matrix_check_bounds(this.value,lb,ub);
    return matrix.make(M);
};

//Add to parent class 
matrix.checkBounds = function(A,lb,ub)
{
    return matrix.make(A).checkBounds(lb,ub);
}
},{"./matrixs":10}],3:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var U = require('./mUtils');
var matrix = require('./matrixs');


function range(min,step,max)
{
    var M = [[]];
    var steps = 1; 
    var maxs = 0; 
    var increment = 1;
    
    if((typeof step)== 'undefined')
    {
        steps = min;
        min = 0;
    }
    else if((typeof max) == 'undefined')
    {
        maxs = step;
        steps = Math.floor(maxs - min)+1;
    }
    else
    {
        increment = step;
        steps = Math.floor((max - min)/step)+1;
    }
    
    for(var i = 0 ; i < steps; i++)
    {
        M[i] = [];
        M[i][0]= min+increment*i; 
    }
    
    return M; 
}

function matrix_zeros(rows,cols)
{
    var M=[];
    for(var i = 0; i<rows;i++)
    {
        M[i]=[];
        for(var j=0; j<cols;j++)
        {
            M[i].push(0);
        }
    }
    return M;
}

function matrix_ones(rows,cols)
{
    var M=[];
    for(var i = 0; i<rows;i++)
    {
        M[i]=[];
        for(var j=0; j<cols;j++)
        {
            M[i].push(1);
        }
    }
    return M;
}


function matrix_ident(m,n)
{
    var M = [];
    for(var i = 0 ; i <m; i++)
    {
        M[i] = [];
        for(var j = 0; j<n; j++)
        {
            var val = (i==j) ? 1 : 0;
            M[i][j] =val;
        }
    }
    return M;
}


matrix.range = function(min,step,max)
{
    return matrix.make(range(min,step,max));
}

matrix.ones = function(m,n)
{
    return matrix.make(matrix_ones(m,n));
}

matrix.ident = function(m,n)
{
    return matrix.make(matrix_ident(m,n));
}

matrix.zeros = function(m,n)
{
    return matrix.make(matrix_zeros(m,n));
}
},{"./mUtils":8,"./matrixs":10}],4:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimatrix.makeerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var u = require('./mUtils');
var matrix = require('./matrixs');

function quick_transpose(A){
    
    var M = []; //Prep new matrix 

    for(var i=0; i<A[0].length; i++)
    {
        M[i]=A.map(function(value,index){return value[i];}); //Gets Column 
    }
    return M;
}

function matrix_delete_row(A,rowNum)
{
    var M = u.matrix_copy(A);
    M.splice(rowNum,1);
    return M; 
}

function matrix_delete_column(A,colNum)
{
    var M = quick_transpose(A);
    M.splice(colNum,1);
    M = quick_transpose(M);
    return M; 
}

//Add to parent class 
matrix.prototype.deleteRow = function(rowNum)
{
    var M = matrix_delete_row(this.value,rowNum);
    return matrix.make(M);
};

//Add to parent class 
matrix.deleteRow = function(A,rowNum)
{
    return matrix.make(A).deleteRow(rowNum);
}

//Add to parent class 
matrix.prototype.deleteCol = function(colNum)
{
    var M = matrix_delete_column(this.value,colNum);
    return matrix.make(M);
};

//Add to parent class 
matrix.deleteCol = function(A,colNum)
{
    return matrix.make(A).deleteCol(colNum);
}
},{"./mUtils":8,"./matrixs":10}],5:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');


//Returns the diagonal elements of a matrix; 
function matrix_diag(A){
    var M = []; //Prep new matrix 

    for(var i=0; i<A.length;i++)
    {
        M[i] = [];
        for(var j = 0; j <A[0].length; j++)
        {
            M[i][j] =  (i==j) ? A[i][j] : 0; 
        }
    }
    return M;
}


//Add to parent class 
matrix.prototype.diag = function()
{
    var M = matrix_diag(this.value);
    return matrix.make(M);
};


//Add to parent class 
matrix.diag = function(A)
{
    return matrix.make(A).diag();
}
},{"./matrixs":10}],6:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');

// Changes from 2D to 1D: [[1,2,3]] --> [1,2,3]
function matrix_flatten(M)
{
    return ([].concat.apply([], M));
}

//Add to parent class 
matrix.prototype.flatten = function()
{
    var M = matrix_flatten(this.value);
    return 
};

//Add to parent class 
matrix.flatten = function(A)
{
    return matrix.make(A).flatten();
}
},{"./matrixs":10}],7:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var U = require('./mUtils');
var matrix = require('./matrixs');


//Inverts non singular matrix
//Source: http://blog.acipo.com/matrix-inversion-in-javascript/ 
function matrix_invert(M){
    // I use Guassian Elimination to calculate the inverse:
    // (1) 'augment' the matrix (left) by the identity (on the right)
    // (2) Turn the matrix on the left into the identity by elemetry row ops
    // (3) The matrix on the right is the inverse (was the identity matrix)
    // There are 3 elemtary row ops: (I combine b and c in my code)
    // (a) Swap 2 rows
    // (b) Multiply a row by a scalar
    // (c) Add 2 rows
    
    //if the matrix isn't square: exit (error)
    if(M.length !== M[0].length){
		throw 'Matrix must be square to invert';
	}
    
    //create the identity matrix (I), and a copy (C) of the original
    var i=0, ii=0, j=0, dim=M.length, e=0, t=0;
    var I = [], C = [];
    for(i=0; i<dim; i+=1){
        // Create the row
        I[I.length]=[];
        C[C.length]=[];
        for(j=0; j<dim; j+=1){
            
            //if we're on the diagonal, put a 1 (for identity)
            if(i==j){ I[i][j] = 1; }
            else{ I[i][j] = 0; }
            
            // Also, make the copy of the original
            C[i][j] = M[i][j];
        }
    }
    
    // Perform elementary row operations
    for(i=0; i<dim; i+=1){
        // get the element e on the diagonal
        e = C[i][i];
        
        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        if(e==0){
            //look through every row below the i'th row
            for(ii=i+1; ii<dim; ii+=1){
                //if the ii'th row has a non-0 in the i'th col
                if(C[ii][i] != 0){
                    //it would make the diagonal have a non-0 so swap it
                    for(j=0; j<dim; j++){
                        e = C[i][j];       //temp store i'th row
                        C[i][j] = C[ii][j];//replace i'th row by ii'th
                        C[ii][j] = e;      //repace ii'th by temp
                        e = I[i][j];       //temp store i'th row
                        I[i][j] = I[ii][j];//replace i'th row by ii'th
                        I[ii][j] = e;      //repace ii'th by temp
                    }
                    //don't bother checking other rows since we've swapped
                    break;
                }
            }
            //get the new diagonal
            e = C[i][i];
            //if it's still 0, not invertable (error)
            if(e==0){
				throw 'Matrix is singular and cannot be inverted';
			}
        }
        
        // Scale this row down by e (so we have a 1 on the diagonal)
        for(j=0; j<dim; j++){
            C[i][j] = C[i][j]/e; //apply to original matrix
            I[i][j] = I[i][j]/e; //apply to identity
        }
        
        // Subtract this row (scaled appropriately for each row) from ALL of
        // the other rows so that there will be 0's in this column in the
        // rows above and below this one
        for(ii=0; ii<dim; ii++){
            // Only apply to other rows (we want a 1 on the diagonal)
            if(ii==i){continue;}
            
            // We want to change this element to 0
            e = C[ii][i];
            
            // Subtract (the row above(or below) scaled by e) from (the
            // current row) but start at the i'th column and assume all the
            // stuff left of diagonal is 0 (which it should be if we made this
            // algorithm correctly)
            for(j=0; j<dim; j++){
                C[ii][j] -= e*C[i][j]; //apply to original matrix
                I[ii][j] -= e*I[i][j]; //apply to identity
            }
        }
    }
    
    //we've done all operations, C should be the identity
    //matrix I should be the inverse:
    return I;
}




matrix.prototype.invert = function()
{
    var M = matrix_invert(this.value);
    return matrix.make(M);
};

matrix.invert = function(A)
{
    return new matrix(matrix_invert(matrix.make(A).value));
}
},{"./mUtils":8,"./matrixs":10}],8:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

//Adds rounding funcitonality 
(function() {
	  /**
	   * Decimal adjustment of a number.
	   *
	   * @param {String}  type  The type of adjustment.
	   * @param {Number}  value The number.
	   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
	   * @returns {Number} The adjusted value.
	   */
	  function decimalAdjust(type, value, exp) {
		// If the exp is undefined or zero...
		if (typeof exp === 'undefined' || +exp === 0) {
		  return Math[type](value);
		}
		value = +value;
		exp = +exp;
		// If the value is not a number or the exp is not an integer...
		if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		  return NaN;
		}
		// Shift
		value = value.toString().split('e');
		value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
		// Shift back
		value = value.toString().split('e');
		return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	  }

	  // Decimal round
	  if (!Math.round10) {
		Math.round10 = function(value, exp) {
		  return decimalAdjust('round', value, exp);
		};
	  }
	  // Decimal floor
	  if (!Math.floor10) {
		Math.floor10 = function(value, exp) {
		  return decimalAdjust('floor', value, exp);
		};
	  }
	  // Decimal ceil
	  if (!Math.ceil10) {
		Math.ceil10 = function(value, exp) {
		  return decimalAdjust('ceil', value, exp);
		};
	  }
})();
	

//Adds array comparison .equals 
if(Array.prototype.equals)
console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});


// Is matrix 2D? 
function is2D(X)
{
    var returnVal = false; 
    if((typeof X[0]) != 'undefined') // must have column row
    {
        if((typeof X[0][0]) != 'undefined') // must be 2D 
        {
            returnVal = true; 
        }
    }
    return returnVal;
}
module.exports.is2D = is2D; 


// Is of type Matrixs?
function isMatrixs(A)
{
    var returnVal = false; 
    
    if((typeof A)=='object')
    {
        if((typeof A.name) !='undefined')
        {
            if(A.name =='Matrixs')
            {
                returnVal = true;
            } 
        }
    }
    return returnVal;
}
module.exports.isMatrixs = isMatrixs; 


// Is matrix 1D? 
function is1D(X)
{
    var returnVal = false; 
    if((typeof X[0]) != 'undefined') // must have column row
    {
        if((typeof X[0][0]) == 'undefined') // must not have 2 columns 
        {
            returnVal = true; 
        }
    }
    return returnVal;
}
module.exports.is1D = is1D; 


// Gets size of matrix 
function matrix_demension(A)
{
    var matrixColumns =0;
    var matrixRows = 0;

    if(is1D(A))
    {
        matrixColumns = 1;
        matrixRows = A.length;
    }
    if(is2D(A))
    {
        matrixColumns = A.length;
        matrixRows = A[0].length;
    }

    return [matrixColumns , matrixRows];
}
module.exports.matrix_demension = matrix_demension; 


// Is scalar?
function isScalar(X)
{
    var returnVal = false; 
    
    if(is2D(X))
    {
        if(matrix_demension(X).equals([1,1]))
        {
            returnVal = true;
        }
    }
    else if(((typeof X[0]) == 'undefined') && (!isMatrixs(X))) 
    {
        returnVal = true;
    }
    return returnVal;  
}
module.exports.isScalar = isScalar; 


//Compares the shape of a matrix 
function matrix_compare_size(A,B)
{
    var returnVal = false;
    var demA = matrix_demension(A);
    var demB = matrix_demension(B);
        
    if(demA.equals(demB))
    {
        returnVal = true;
    }
    return returnVal;
}
module.exports.matrix_compare_size = matrix_compare_size; 


// Gets the scalar from a 2d array such as [[5]]
function getScalar(x)
{
    var returnValue = 0; 
    if(is2D(x))
    {
        if(matrix_demension(x).equals([1,1]))
        {
            returnValue = x[0][0];
        }
    }
    else if(isScalar(x))
    {
        returnValue = x;
    }
    return returnValue;
}
module.exports.getScalar = getScalar; 


//Copy of array 
function matrix_copy(M)
{
    var M_Array = [];
    if(typeof M[0] != 'undefined')
    {
        for(var i = 0; i < M.length ; i++)
        {
            M_Array[i] = [];
            for(var j = 0; j < M[0].length ; j++)
            {
                M_Array[i].push(M[i][j]);
            }
        }
    }
    return M_Array;
}
module.exports.matrix_copy = matrix_copy; 
},{}],9:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

require('./add');
require('./subtract');
require('./print');
require('./multiply');
require('./transpose');
require('./stats');
require('./invert');
require('./shape');
require('./create');
require('./diag');
require('./bound');
require('./delete');
require('./random');
require('./flatten');

Matrixs = require('./matrixs');
},{"./add":1,"./bound":2,"./create":3,"./delete":4,"./diag":5,"./flatten":6,"./invert":7,"./matrixs":10,"./multiply":11,"./print":12,"./random":13,"./shape":14,"./stats":15,"./subtract":16,"./transpose":17}],10:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

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
},{"./mUtils":8}],11:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var u = require('./mUtils');
var matrix = require('./matrixs');


// Is multiply valid? e.g. is A.n == B.m 
function isMatrixMultiplyValid(A,B)
{
    var returnVal = false;
    var demA = u.matrix_demension(A);
    var demB = u.matrix_demension(B);

    if(demA[1] == demB[0])
    {
        returnVal = true;
    }
    return returnVal;
}


//Matrix multiply constant 
function matrix_multiplyc(A,c)
{
    M = [];

    if((typeof A[0][0]) != 'undefined')
    {
        for(var i =0; i<A.length; i++)
        {
            M[i] = [];
            for(var j = 0; j<A[0].length;j++)
            {
                M[i][j] = A[i][j]*c;
            }
        }
    }
    else
    {
        for(var i =0; i<A.length; i++)
        {
            M[i] = A[i]*c;
        }
    }
    return M;
}


//Matrix dot product 
function matrix_dot(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}


//Matrix element wise multiplicaiton 
function matrix_multiply_same(A,B)
{
    var M = []; 

    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j< A[0].length; j++)
        {
            M[i][j] = A[i][j] * B[i][j];
        }
    }

    return M;
}


//Higher level multiply funciton 
function matrix_multiply(A,B)
{
    var returnVal = 0;
    var bIsScalar = u.isScalar(B);
    var matrixSameSize = u.matrix_compare_size(A,B);

    if(bIsScalar)
    {
        B = u.getScalar(B);
        returnVal = matrix_multiplyc(A,B);	
    }
    else if(isMatrixMultiplyValid(A,B))
    {
        returnVal = matrix_dot(A,B);
    }
    else if(matrixSameSize)
    {
        returnVal = matrix_multiply_same(A,B);
    }
    else
    {
        returnVal = 'Invalid';
    }

    return returnVal;
}


//Add to parent class 
matrix.prototype.multiply = function(x)
{
    var M = matrix_multiply(this.value,matrix.make(x).value);
    return matrix.make(M);
};


//Add to parent class 
matrix.multiply = function(A,B)
{
    return new matrix(matrix_multiply(matrix.make(A).value,matrix.make(B).value));
}


},{"./mUtils":8,"./matrixs":10}],12:[function(require,module,exports){
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

},{"./matrixs":10}],13:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');

function matrix_rand(m,n)
{
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
	

//Add to parent class 
matrix.rand = function(m,n)
{
    return matrix.make(matrix_rand(m,n));
}



//Add to parent class 
matrix.randn = function(m,n)
{
    return matrix.make(matrix_randn(m,n));
}
},{"./matrixs":10}],14:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

//Shape related funcitons to matricies. Growing horziontally and vertically as well as fetching columns and rows,
var u = require('./mUtils');
var matrix = require('./matrixs');


function matrix_cat_horizontal(A,B)
{
    var M = [];
    
    if(A.length != B.length)
    {
        throw 'Must have same number of rows'
    }			
    
    M = u.matrix_copy(A);
    for(var i =0; i<M.length;i++) // for rows of M
    {
        M[i] = M[i].concat(B[i]);
    }
    return M;
}


function matrix_push(A,B)
{
    var aColumns = A[0].length;
    var bColumns = B[0].length;
    var M = u.matrix_copy(A);
    
    if(aColumns != bColumns)
    {
        throw 'Column size must be the same';
    }
    
    for(var i =0; i < B.length; i++)
    {
        M.push(B[i]);
    }
    return M;
}


function matrix_get_columns(A,start,end)
{
    var M = [];
    var m = A.length; 
    var startPoint = start; 
    var length = 1; 
    if(typeof end != 'undefined')
    {
        length += end - start; 
    }
    
    for(var i = 0; i <m; i++)
    {
        M[i] = [];
        for(var j = 0; j < length; j++)
        {
            M[i][j] = A[i][j+startPoint];
        }
    }
    return M;
}


function matrix_get_rows(A,start,end)
{
    var M = [];
    var m = A.length; 
    var startPoint = start; 
    var length = 1; 
    if(typeof end != 'undefined')
    {
        length += end - start; 
    }
    
    for(i = 0; i < length; i++)
    {
        M[i] = A[i+start];
    }
    return M;
}


matrix.prototype.push = function(x)
{
    this.value = matrix_push(this.value,matrix.make(x).value);
    return matrix.make(M);
};

matrix.catVertical = function(A,B)
{
    return new matrix(matrix_push(matrix.make(A).value,matrix.make(B).value));
}

matrix.prototype.catVertical = function(x)
{
    var M = matrix_push(this.value,matrix.make(x).value);
    return matrix.make(M);
};	

matrix.catHorizontal = function(A,B)
{
    return new matrix(matrix_cat_horizontal(matrix.make(A).value,matrix.make(B).value));
}

matrix.prototype.catHorizontal = function(x)
{
    var M = matrix_cat_horizontal(this.value,matrix.make(x).value);
    return matrix.make(M);
};	

matrix.prototype.shape = function()
{
    return u.matrix_demension(this.value);
};

matrix.shape = function(A)
{
    return u.matrix_demension(matrix.make(A));
}

matrix.prototype.columns = function(start,end)
{
    return new matrix(matrix_get_columns(this.value,start,end));
}

matrix.columns = function(A,start,end)
{
    return new matrix(matrix_get_columns(matrix.make(A).value,start,end));
}

matrix.prototype.column = function(start)
{
    return new matrix(matrix_get_columns(this.value,start));
}

matrix.column = function(A,start)
{
    return new matrix(matrix_get_columns(matrix.make(A).value,start));
}

matrix.prototype.rows = function(start,end)
{
    return new matrix(matrix_get_rows(this.value,start,end));
}

matrix.rows = function(A,start,end)
{
    return new matrix(matrix_get_rows(matrix.make(A).value,start,end));
}

matrix.prototype.row = function(start)
{
    return new matrix(matrix_get_rows(this.value,start));
}

matrix.row = function(A,start)
{
    return new matrix(matrix_get_rows(matrix.make(A).value,start));
}
},{"./mUtils":8,"./matrixs":10}],15:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

//This is a clobber file of basic primitive funcitons such as a matrix mean, sum, min, max...ect 
var u = require('./mUtils');
var matrix = require('./matrixs');


//Find mean of matrix: [1,2,3] --> 2
function matrix_mean(A)
{
    var merge = [].concat.apply([],A); // flatten array 
    var lengthM = merge.length; 
    var meanM = 0; 
    for(var i = 0; i <lengthM; i++)
    {
        meanM += merge[i];
    }
    return (meanM/lengthM);
}

// Changes from 2D to 1D: [[1,2,3]] --> [1,2,3]
function matrix_flatten(M)
{
    return ([].concat.apply([], M));
}

//Find max of array: [1,2,3] --> 3
function getMaxOfArray(numArray) {
	  return Math.max.apply(null, matrix_flatten(numArray));
}
	
//Find min of array: [1,2,3] --> 1
function getMinOfArray(numArray) {
    return Math.min.apply(null, matrix_flatten(numArray));
}

//Find sum of array: [1,2,3] --> 6
function getSumOfMatrix(matrixInput)
{
    return matrix_flatten(matrixInput).reduce(function(a, b) { return a + b; }, 0);
}

//Find sum of array: [1,2,3] --> 6
function getRMSOfMatrix(matrixInput)
{
    var M = matrix_flatten(matrixInput); 
    for(var i = 0; i < M.length; i++)
    {
        M[i] = M[i]*M[i];
    }
    return Math.sqrt(getSumOfMatrix(M)/M.length); 

}

//Finds the number of elements of a array: 50x50 --> 2500
function matrix_length(M)
{
    return matrix_flatten(M).length;
}

//Rounds matrix: [1,2,3.3] --> [1,2,3]
function matrix_round(A,d)
{
    var d = -1 * d;
    var M = [];
    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j < A[0].length; j++)
        {
            M[i][j] = Math.round10(A[i][j],d);	
        }
    }
    return M;
}

// Add functions to parent class 
matrix.prototype.mean = function()
{
    return matrix_mean(this.value);
};

matrix.prototype.rms = function()
{
    return getRMSOfMatrix(this.value);
};

matrix.prototype.min = function()
{
    return getMinOfArray(this.value);
};

matrix.prototype.max = function(x)
{
    return getMaxOfArray(this.value);
};

matrix.prototype.sum = function()
{
    return getSumOfMatrix(this.value);
};

matrix.prototype.length = function()
{
    return matrix_length(this.value);
};

matrix.prototype.unroll = function()
{
    return matrix_flatten(this.value);
};

matrix.round = function(A,d)
{
    return matrix.make(matrix_round(matrix.make(A).value,d));
}

matrix.prototype.round = function(d)
{
    var M = matrix_round(this.value,d);
    return matrix.make(M);
};
},{"./mUtils":8,"./matrixs":10}],16:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var u = require('./mUtils');
var matrix = require('./matrixs');
var addM = require('./add');


//Subtracts scalar or matrix from a matrix 
function matrix_subtract(A,B)
{
    var M = [];
    var returnVal = 'Dimension Error';

    if(u.isScalar(B))
    {
        B = u.getScalar(B);
        returnVal = addM.matrix_add_scalar(A,-B);
    }
    else if(u.is2D(A) && u.is2D(B) && u.matrix_compare_size(A,B)) 
    {
        for(var i =0; i<A.length; i++)
        {
            M[i] = [];
            for(var j = 0; j<A[0].length;j++)
            {
                M[i][j] = A[i][j]-B[i][j];
            }
            returnVal = M;  
        }
    }
    else
    {
        throw 'Demension Error!';
    }
    return returnVal; 
}


//Add to parent class 
matrix.prototype.subtract = function(x)
{
    var M = matrix_subtract(this.value,matrix.make(x).value);
    return (new matrix(M));
};


//Add prototype to parent class 
matrix.subtract = function(A,B)
{
    return new matrix(matrix_subtract(matrix.make(A).value,matrix.make(B).value));
}
},{"./add":1,"./mUtils":8,"./matrixs":10}],17:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');


// Returns Transpose of matrix
function matrix_transpose(M){
    // Rows shoudl be columns, columns become rows 
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


//Add to parent class 
matrix.transpose = function(A)
{
    return matrix.make(A).transpose();
}
},{"./matrixs":10}],18:[function(require,module,exports){
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
},{"../Matrixs/matrix":9}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

//Package file for all models 
Models ={};

Models.line = require('./line');
Models.power = require('./power');
Models.jacobian = require('./jacobian');

},{"./jacobian":18,"./line":19,"./power":21}],21:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

// Model of the form: a*b^x || 

function modelObj(x)
{
    this.param = x; //paramters 
};

modelObj.type = 'power';

modelObj.prototype.fnc = function(x)
{
    var M = [];
    for(var i = 0; i < x.length; i++)
    {
        M[i] = [ this.param[0] * Math.pow(x[i][0],this.param[1])] ; // y = a*x^b 
    }
    return M;   
}

modelObj.prototype.grad = function(x)
{
    var M = [];

    for(var i = 0; i < x.length; i++)
    {
        M[i] = [];
        M[i][0] = Math.pow(x[i][0],this.param[1]);
        M[i][1] = this.param[0] * Math.log(x[i][0]) * Math.pow(x[i][0],this.param[1]);
    }
    return M; 
}

module.exports = modelObj;  
},{}],22:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 



require('../Matrixs/matrix');
var matrix = require('../Matrixs/matrixs');
//var plotly = require('./plotly.min.js');

var plotColorArrayScatter = ['rgba(0,100,200,0.2)','rgba(200,0,100,0.2)'];
var plotColorArrayLine = ['rgba(0,100,200,0.9)','rgba(200,0,100,0.9)'];
	
var plotOptions = {};
var yOverBound =1.1; 
var yUnderBound = 0.9;
plotOptions.yaxis = {};
plotOptions.xaxis = {};
var plotDataObjs = [];


var layout = { 
    xaxis: {
            fixedrange: true
            }
};

// Highest level function for plot 
function plots(inputObj,options)
{
    var objTypes = parse_data_obj(inputObj);
    prep_plot_data(inputObj,objTypes);
    //handle_plot_bounds(inputObj,objTypes);
    plotArray = packageData(inputObj,objTypes);
    create_graph(options);
}
module.exports = plots;

function extendUpperBound(bound)
{
    var returnValue = 0; 
    if(bound>0)
    {
        returnValue = yOverBound*bound;
    }
    else if(bound==0)
    {
        returnValue = 1; 
    } 
    else
    {
        returnValue = (1+(1-yOverBound))*bound;
    }
    return returnValue;
}

function extendLowerBound(bound)
{
    var returnValue = 0; 
    if(bound>0)
    {
        returnValue = yUnderBound*bound;
    }
    else if(bound==0)
    {
        returnValue = -1; 
    } 
    else
    {
        returnValue = (1+(1-yUnderBound))*bound;
    }
    return returnValue;
}

function parse_data_obj(inputObj)
{
    var objType = 'null';

    if(inputObj instanceof matrix)
    {
        objType = 'Single Matrixs';
    }
    else if(Array.isArray(inputObj))
    {
        var numMatrixs = x.filter(function(value){ return (value instanceof matrix)}).length;
        if(numMatrixs==0)
        {
            objType = 'Single Matrixs';
            inputObj = Matrixs.make(inputObj);
        }
        else if(numMatrixs==1)
        {
            objType = 'Single Matrixs';
            inputObj = Matrixs.make(inputObj[0]);
        }
        else if(numMatrixs>1)
        {
            objType = 'Multiple Matrixs';
        } 
    }
    return objType;
}

function prep_plot_data(dataObj,objType)
{
    if(objType == 'Single Matrixs')
    {
        dataObj = [dataObj]; // Make into array  
    }

    for(var i = 0; i < dataObj.length; i++)
    {
        var M = dataObj[i]; 
        var shape = M.shape();
        if(shape[0]<shape[1])
        {
            M = M.transpose(); // Make column matrix 
        }
        dataObj[i] = M; 
    }
}

function handle_plot_bounds(dataObj,objType)
{

    if(objType == 'Single Matrixs')
    {
        if(Array.isArray(dataObj))
        {
            var M = dataObj[0];
        }

        var rowNum = M.shape()[0];
        var columnNum = M.shape()[1];

        if(columnNum==1) // 1D Data 
        {
            plotOptions.xaxis.min = 0; // Will enumerate from 0 to end 
            plotOptions.xaxis.max = rowNum;
            plotOptions.yaxis.min = extendLowerBound(M.min());
            plotOptions.yaxis.max = extendUpperBound(M.max()); 

            matrix.range(0,40).catHorizontal()

        }
        else
        {
            plotOptions.xaxis.min = M.columns(0).min();
            plotOptions.xaxis.min = M.columns(0).max();
            var dataM = M.delCol(0); // Don't take x array into account
            
            plotOptions.yaxis.min = extendLowerBound(M.min());
            plotOptions.yaxis.max = extendUpperBound(M.max());  
        }
    }
    else if(objType == 'Multiple Matrixs')
    {
        var M = dataObj[0];
        plotOptions.xaxis.min = M.min();
        plotOptions.xaxis.max = M.max(); 
        
        var M = dataObj[1];
        plotOptions.yaxis.min = extendLowerBound(M.min());
        plotOptions.yaxis.max = extendUpperBound(M.max());  
        
    }  
}


// This function preps data for FLOTR2
function packageData(dataObj,objType)
{
    // It is assumed that datOBj is in a array; 

    var plotDataArray = [];
    if(objType == 'Single Matrixs')
    {
        var localObj = {};
        var localData = dataObj[0];
        var dimensions = localData.shape()[1];
        var points = localData.make(b).shape()[0];
        
        if(dimensions==1)
        {
            var A = matrix.range(points).catHorizontal(localData);
            localObj.x = A.flatten();
            
            dataObj.y = localData.flatten(); 
        }
        else // Assumes in proper format already
        {
             dataObj.data = localData.value; 
        }
        plotDataArray.push(dataObj)
    }
    return plotDataArrayj;
}

function createPlotDiv()
{
        var iDiv = document.createElement('div');
        iDiv.id = 'plotDiv';
        iDiv.style.width='700px';
        iDiv.style.height='400px';
        iDiv.style.display='inline-block';
        document.body.style.textAlign ='center';
        document.getElementsByTagName('body')[0].appendChild(iDiv);
}

function create_graph(options)
{
    if((typeof Ploty) == 'undefined')
    {
        var Ploty = {};
    }

    if((document.getElementById('plotDiv')) == null )
    {
        createPlotDiv();
    }
     graph = Plotly.newPlot('plotDiv', plotArray,layout,{displayModeBar: false});
}

function testPlotly()
{
    
    createPlotDiv();
    var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    mode: 'markers',
    type: 'scatter'
    };

    var trace2 = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: 'lines',
    type: 'scatter'
    };

    var trace3 = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'lines+markers',
    type: 'scatter'
    };

    var data = [trace1, trace2, trace3];

    Plotly.newPlot('plotDiv', data,{title:'uSuck'},{displayModeBar: false});
}


//testPlotly();


/*
function matrix_plot(args1,options)
{
    var plotArray = [];
    
    if(isMatrixs(args1)) // put into array if matrixs
    {
        args1 = [args1];
    }
    
    for(var w = 0; w < args1.length; w++)
    {
        var arg1 = args1[w].value;
        var M = [];
        var minVal = getMinOfArray(arg1);
        var maxVal = getMaxOfArray(arg1);
        var plotObj = {};
        plotOptions.shadowSize = 0;
        plotOptions.HtmlText = true; 
    
        

        
        for(var i = 0; i < arg1.length; i++)
        {
            M[i] = [i,arg1[i][0]];
        }
        

        plotOptions.data = M;
        
    
        
        if((typeof args1[w].plotType)=='undefined')
        {
            plotObj.color = plotColorArrayScatter[w];
            plotObj.lines ={show:false};
            plotObj.points ={
                show:true,
                fillColor: plotColorArrayScatter[w],
                radius:20,
                lineWidth: 1,
                fillOpacity:0.1,
            };
        }
        else
        {
            plotObj.color = plotColorArrayLine[w];
        }
        plotArray.push(plotObj)
    }
    
    graph = Flotr.draw(plotDiv, plotArray, plotOptions );

}
*/


},{"../Matrixs/matrix":9,"../Matrixs/matrixs":10}],23:[function(require,module,exports){


require('../Matrixs/matrix');
require('../Models/models');

function get_jacobian(datas,modelObj)
{
    // Form jacobian matrix based upon data and model gradient 
    if((typeof modelObj.grad) !='undefined') // if it has a jacobian 
    {
        var J = Matrixs.make(modelObj.grad(datas));
    }
    else
    {
        var J = Models.jacobian(datas,modelObj); // Use numerical jacobian 
    }
    
    return J;
}	

function get_residuals(dataObj,modelObj)
{
    // Equivalent: Ax - b --> residuals || error 
    var r = Matrixs.make(modelObj.fnc(dataObj.input)).subtract(dataObj.output);
    return r; 
}

function hasConverged(costArray)
{
    var hasConverged = false; 
    var newCost = costArray[costArray.length-1];
    var oldCost = costArray[costArray.length-2];
    var change = Math.abs(newCost - oldCost); 
    if(change < 0.001)
    {
        hasConverged = true;
    }
    return hasConverged;
}

module.exports.get_jacobian = get_jacobian;
module.exports.get_residuals = get_residuals;
module.exports.hasConverged = hasConverged;
},{"../Matrixs/matrix":9,"../Models/models":20}],24:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

require('../Matrixs/matrix');
require('../Models/models');
var comLib = require('./common'); 

function gauss_newton(dataObj,modelObj,options)
{
    var resultObj = {};
    resultObj.itterationValues = [modelObj.param.slice()]; // This is the initial guess 
    var r = comLib.get_residuals(dataObj,modelObj); // initial error 
    resultObj.itterationCost = [r.rms()]; // inital cost 
    resultObj.convergence = false; 
    for(var i = 0 ; i < 50; i++)
    {
        var J = comLib.get_jacobian(dataObj.input,modelObj);	
        
        var step = J.transpose().multiply(J).invert().multiply(J.transpose()).multiply(r); // (J^T * J)^-1 * J^T * r : Normal equation w/ jacobian 
        
        modelObj.param = Matrixs.subtract(modelObj.param, step.unroll()).unroll(); // Update model coieficents 
        
        resultObj.itterationValues[i+1] = modelObj.param.slice(); //Store record of model coieficents
        
        r = comLib.get_residuals(dataObj,modelObj); //Get new errror 
        
        resultObj.itterationCost[i+1] = r.rms(); // store cost

        if(comLib.hasConverged(resultObj.itterationCost)) //check for convergence 
        {
            resultObj.convergence = true; 
            break; 
        }
    }
    
    resultObj.solution = modelObj.param.slice(); 
    
    return resultObj;

}
module.exports = gauss_newton; 

//var step = Matrixs.multiply(Matrixs.transpose(J),J).invert().multiply(Matrixs.transpose(J)).multiply(r);
},{"../Matrixs/matrix":9,"../Models/models":20,"./common":23}],25:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

require('../Matrixs/matrix');
require('../Models/models');
var comLib = require('./common'); 

function levenberg_marquardt(dataObj,modelObj,options)
{
    var resultObj = {};
    resultObj.itterationValues = [modelObj.param.slice()]; // This is the initial guess 
    var r = comLib.get_residuals(dataObj,modelObj); // initial error 
    resultObj.itterationCost = [r.rms()]; // inital cost 
    var currCost = r.rms();
    var newCost = currCost;   
    var lamda = 0.001; 
    
    for(var i = 0 ; i < 50; i++)
    {
        r = comLib.get_residuals(dataObj,modelObj); //Get current error 
        var J = comLib.get_jacobian(dataObj.input,modelObj);	
        
        var H = J.transpose().multiply(J);
        var step = H.add(H.diag().multiply(lamda)).invert().multiply(J.transpose()).multiply(r);
        // step =  (H + lamda * diag(H))^(-1) * J^T * r // levenberg step 

        modelObj.param = Matrixs.subtract(modelObj.param, step.unroll()).unroll(); // Apply step, Update model coieficents
        r = comLib.get_residuals(dataObj,modelObj); //Get current error 
        newCost =  r.rms(); // store cost
        resultObj.itterationCost[i+1] = newCost; 

        if (newCost > currCost) // Was it a bad step? 
        {
            lamda *= 10; // Dampen step 
            modelObj.param = resultObj.itterationValues[i].slice(); // Revert to old model parameters   
        }
        else // Was a good step 
        {
            currCost = newCost;
            lamda *= 0.1;  
        } 

        resultObj.itterationValues[i+1] = modelObj.param.slice(); //Store record of model coieficents
        
        if(comLib.hasConverged(resultObj.itterationCost)) //check for convergence 
        {
            resultObj.convergence = true; 
            break; 
        }

    }

    resultObj.solution = modelObj.param.slice(); 
    return resultObj;
}
module.exports = levenberg_marquardt; 

},{"../Matrixs/matrix":9,"../Models/models":20,"./common":23}],26:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimatrix.makeerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

require('../Matrixs/matrix.js');
var matrix = require('../Matrixs/matrixs.js');

function matrix_lsq(A,b)
{
    return A.transpose().multiply(A).invert().multiply(A.transpose()).multiply(b); // Normal equation (A^T * A)^-1 * A^T * b 
}

matrix.lsq = function(A,b)
{
    return matrix_lsq(matrix.make(A),matrix.make(b));
}

matrix.prototype.lsq = function(b)
{
    return matrix_lsq(matrix.make(this.value),matrix.make(b));
};
},{"../Matrixs/matrix.js":9,"../Matrixs/matrixs.js":10}],27:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimatrix.makeerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 


Solvers ={};

Solvers.gaussNewton = require('./gaussNewton');
Solvers.levenbergMarquardt = require('./levenbergMarquardt');
require('./lsqr.js');

},{"./gaussNewton":24,"./levenbergMarquardt":25,"./lsqr.js":26}],28:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

require('./Matrixs/matrix');
require('./Solvers/solvers');
require('./Models/models');
Plots = require('./Plots/plots');
},{"./Matrixs/matrix":9,"./Models/models":20,"./Plots/plots":22,"./Solvers/solvers":27}]},{},[28]);
