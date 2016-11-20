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


},{"./mUtils":12,"./matrixs":14}],2:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');

// applies a function to every element of a matrix
function matrix_apply(A,fnc)
{
    var M = [];
    for(var i = 0 ; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j<A[0].length; j++)
        {
            M[i][j] = fnc(A[i][j]);
        }
    }
    return M;
}

//Add to parent class 
matrix.prototype.apply = function(fnc)
{
    if((typeof fnc) != 'function')
    {
        throw 'Must apply a function';
    }
    var M = matrix.make(matrix_apply(this.value,fnc));
    return M;
};

//Add to parent class 
matrix.apply = function(A,fnc)
{
    return matrix.make(A).apply(fnc);
}
},{"./matrixs":14}],3:[function(require,module,exports){
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


function matrix_clamp(A,lb,ub)
{
    var M = []; 
    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j < A[0].length; j++)
        {
            M[i][j] = (Math.round10(A[i][j],-4)>ub) ? ub : (Math.round10(A[i][j],-4)<lb) ? lb : A[i][j];
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
},{"./matrixs":14}],4:[function(require,module,exports){
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

    if((typeof cols)== 'undefined')
    {
        cols = 1; 
    }

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

    if((typeof cols)== 'undefined')
    {
        cols = 1; 
    }

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

    if((typeof n)== 'undefined')
    {
        n = m; 
    }

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
},{"./mUtils":12,"./matrixs":14}],5:[function(require,module,exports){
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
},{"./mUtils":12,"./matrixs":14}],6:[function(require,module,exports){
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
        for(var j = 0; j <A.length; j++)
        {
            M[i][j] =  (i==j) ? A[i][j] : 0; 
        }
    }
    return M;
}

function make_diag(A)
{
    var M = [];
    var xLocal = Matrixs.make(A);
    if(xLocal.shape()[0]<xLocal.shape()[1])
    {
        xLocal = xLocal.transpose();
    }
    xLocal = xLocal.value;

    for(var i = 0; i < xLocal.length; i++)
    {
        M[i]= [];
        for(var j = 0; j < xLocal.length; j++)
        {
            var diagVal = (i==j) ? xLocal[i][0] : 0;
            M[i][j] = diagVal;
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


//Add to parent class 
matrix.prototype.makeDiag = function()
{
    var M = make_diag(this.value);
    return matrix.make(M);
};


//Add to parent class 
matrix.makeDiag = function(A)
{
    return matrix.make(A).makeDiag();
}
},{"./matrixs":14}],7:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');
require('./shape');

//Returns the diagonal elements of a matrix; 
function matrix_element_divide(A,B){

    var M = []; 

    for(var i=0; i<A.length;i++)
    {
        M[i] = [];
        for(var j = 0; j <A[0].length; j++)
        {
            M[i][j] =  A[i][j]/B[i][j]; 
        }
    }
    return M;
}


//Add to parent class 
matrix.prototype.divide = function(B)
{

    var shapeA = this.shape();
    var shapeB = B.shape();
    var M = [];

    if(shapeA.equals(shapeB))
    {
        M = matrix_element_divide(this.value,B.value);
    }
    else
    {
        throw 'element wise division is currently only supported. Matricies must be same shape' 
    } 

    return matrix.make(M);
};


//Add to parent class 
matrix.divide = function(A,B)
{
    return matrix.make(A).divide(Matrixs.make(B));
}
},{"./matrixs":14,"./shape":19}],8:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');
require('./transpose');

// Changes from 1D to 2D: 
function matrix_fill(M,m,n)
{
    var mElements = M.length * M[0].length;
    var outElements = m*n;
    var fill = [];
    var v = 0;
    if(mElements != outElements)
    {
        throw 'Invalid Fill container';
    }

    for(var i = 0; i < m; i++)
    {
        fill[i] = [];
        for(var j = 0; j < n; j++ )
        {
            fill[i][j] = M[0][v];
            v++;  
        }
    }
    return fill; 
}

//Add to parent class 
matrix.prototype.fill = function(m,n)
{
    if(this.value.length>this.value[0].length) // If is column vector, transpose it. 
    {
        this.value = this.transpose().value;
    }

    var M = matrix_fill(this.value,m,n);
    return matrix.make(M);
};

//Add to parent class 
matrix.fill = function(A,m,n)
{
    return matrix.make(A).fill(m,n);
}
},{"./matrixs":14,"./transpose":22}],9:[function(require,module,exports){
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
    return M;
};

//Add to parent class 
matrix.flatten = function(A)
{
    return matrix.make(A).flatten();
}
},{"./matrixs":14}],10:[function(require,module,exports){
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
				console.log('Matrix is singular and cannot be inverted. Attempting SVD');
				return pinv(M);
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


var localEps = 2.220446049250313e-16;

function pinv(A) {
  var z = svd(A), foo = z.S[0];
  var U = z.U, S = z.S, V = z.V;
  var m = A.length, n = A[0].length, tol = Math.max(m,n)*localEps*foo,M = S.length;
  var i,Sinv = new Array(M);
  for(i=M-1;i!==-1;i--) { if(S[i]>tol) Sinv[i] = 1/S[i]; else Sinv[i] = 0; }
  //return numeric.dot(numeric.dot(V,numeric.diag(Sinv)),numeric.transpose(U))

  var SinvM = []; 
  for(var i = 0; i < Sinv.length; i++)
  {
	  SinvM[i] = [];
	  for(var j = 0; j < Sinv.length; j++)
	  {
		  var sinvVal = (i==j) ? Sinv[i] : 0;
		  SinvM[i][j] = sinvVal; 
	  }
  }
  SinvM = matrix.make(SinvM);
  V = matrix.make(V);
  U = matrix.make(U);
  return V.multiply(SinvM).multiply(U.transpose());

}

matrix.prototype.pinv = function()
{
    var M = pinv(this.value);
    return matrix.make(M);
};

matrix.pinv = function(A)
{
    return new matrix(pinv(matrix.make(A).value));
}


function rep(s,v,k) {
    if(typeof k === "undefined") { k=0; }
    var n = s[k], ret = Array(n), i;
    if(k === s.length-1) {
        for(i=n-2;i>=0;i-=2) { ret[i+1] = v; ret[i] = v; }
        if(i===-1) { ret[0] = v; }
        return ret;
    }
    for(i=n-1;i>=0;i--) { ret[i] = rep(s,v,k+1); }
    return ret;
}


//Source:Numerics library
//Taken from https://github.com/sloisel/numeric/blob/master/src/svd.js.
//Left as is except for small modificaitons.  

//Shanti Rao sent me this routine by private email. I had to modify it
//slightly to work on Arrays instead of using a Matrix object.
//It is apparently translated from http://stitchpanorama.sourceforge.net/Python/svd.py


function svd(A) {
    var temp;
//Compute the thin SVD from G. H. Golub and C. Reinsch, Numer. Math. 14, 403-420 (1970)
	//var prec= numeric.epsilon; //Math.pow(2,-52) // assumes double prec
	var prec = 2.220446049250313e-16;
    var tolerance= 1.e-64/prec;
	var itmax= 50;
	var c=0;
	var i=0;
	var j=0;
	var k=0;
	var l=0;
	
	//var u= numeric.clone(A);
	var u = U.matrix_copy(A);

    var m= u.length;
	
	var n= u[0].length;
	
	if (m < n) throw "Need more rows than columns"
	
	var e = new Array(n);
	var q = new Array(n);
	for (i=0; i<n; i++) e[i] = q[i] = 0.0;
	var v = rep([n,n],0);
//	v.zero();
	
 	function pythag(a,b)
 	{
		a = Math.abs(a)
		b = Math.abs(b)
		if (a > b)
			return a*Math.sqrt(1.0+(b*b/a/a))
		else if (b == 0.0) 
			return a
		return b*Math.sqrt(1.0+(a*a/b/b))
	}

	//Householder's reduction to bidiagonal form

	var f= 0.0;
	var g= 0.0;
	var h= 0.0;
	var x= 0.0;
	var y= 0.0;
	var z= 0.0;
	var s= 0.0;
	
	for (i=0; i < n; i++)
	{	
		e[i]= g;
		s= 0.0;
		l= i+1;
		for (j=i; j < m; j++) 
			s += (u[j][i]*u[j][i]);
		if (s <= tolerance)
			g= 0.0;
		else
		{	
			f= u[i][i];
			g= Math.sqrt(s);
			if (f >= 0.0) g= -g;
			h= f*g-s
			u[i][i]=f-g;
			for (j=l; j < n; j++)
			{
				s= 0.0
				for (k=i; k < m; k++) 
					s += u[k][i]*u[k][j]
				f= s/h
				for (k=i; k < m; k++) 
					u[k][j]+=f*u[k][i]
			}
		}
		q[i]= g
		s= 0.0
		for (j=l; j < n; j++) 
			s= s + u[i][j]*u[i][j]
		if (s <= tolerance)
			g= 0.0
		else
		{	
			f= u[i][i+1]
			g= Math.sqrt(s)
			if (f >= 0.0) g= -g
			h= f*g - s
			u[i][i+1] = f-g;
			for (j=l; j < n; j++) e[j]= u[i][j]/h
			for (j=l; j < m; j++)
			{	
				s=0.0
				for (k=l; k < n; k++) 
					s += (u[j][k]*u[i][k])
				for (k=l; k < n; k++) 
					u[j][k]+=s*e[k]
			}	
		}
		y= Math.abs(q[i])+Math.abs(e[i])
		if (y>x) 
			x=y
	}
	
	// accumulation of right hand gtransformations
	for (i=n-1; i != -1; i+= -1)
	{	
		if (g != 0.0)
		{
		 	h= g*u[i][i+1]
			for (j=l; j < n; j++) 
				v[j][i]=u[i][j]/h
			for (j=l; j < n; j++)
			{	
				s=0.0
				for (k=l; k < n; k++) 
					s += u[i][k]*v[k][j]
				for (k=l; k < n; k++) 
					v[k][j]+=(s*v[k][i])
			}	
		}
		for (j=l; j < n; j++)
		{
			v[i][j] = 0;
			v[j][i] = 0;
		}
		v[i][i] = 1;
		g= e[i]
		l= i
	}
	
	// accumulation of left hand transformations
	for (i=n-1; i != -1; i+= -1)
	{	
		l= i+1
		g= q[i]
		for (j=l; j < n; j++) 
			u[i][j] = 0;
		if (g != 0.0)
		{
			h= u[i][i]*g
			for (j=l; j < n; j++)
			{
				s=0.0
				for (k=l; k < m; k++) s += u[k][i]*u[k][j];
				f= s/h
				for (k=i; k < m; k++) u[k][j]+=f*u[k][i];
			}
			for (j=i; j < m; j++) u[j][i] = u[j][i]/g;
		}
		else
			for (j=i; j < m; j++) u[j][i] = 0;
		u[i][i] += 1;
	}
	
	// diagonalization of the bidiagonal form
	prec= prec*x
	for (k=n-1; k != -1; k+= -1)
	{
		for (var iteration=0; iteration < itmax; iteration++)
		{	// test f splitting
			var test_convergence = false
			for (l=k; l != -1; l+= -1)
			{	
				if (Math.abs(e[l]) <= prec)
				{	test_convergence= true
					break 
				}
				if (Math.abs(q[l-1]) <= prec)
					break 
			}
			if (!test_convergence)
			{	// cancellation of e[l] if l>0
				c= 0.0
				s= 1.0
				var l1= l-1
				for (i =l; i<k+1; i++)
				{	
					f= s*e[i]
					e[i]= c*e[i]
					if (Math.abs(f) <= prec)
						break
					g= q[i]
					h= pythag(f,g)
					q[i]= h
					c= g/h
					s= -f/h
					for (j=0; j < m; j++)
					{	
						y= u[j][l1]
						z= u[j][i]
						u[j][l1] =  y*c+(z*s)
						u[j][i] = -y*s+(z*c)
					} 
				}	
			}
			// test f convergence
			z= q[k]
			if (l== k)
			{	//convergence
				if (z<0.0)
				{	//q[k] is made non-negative
					q[k]= -z
					for (j=0; j < n; j++)
						v[j][k] = -v[j][k]
				}
				break  //break out of iteration loop and move on to next k value
			}
			if (iteration >= itmax-1)
				throw 'Error: no convergence.'
			// shift from bottom 2x2 minor
			x= q[l]
			y= q[k-1]
			g= e[k-1]
			h= e[k]
			f= ((y-z)*(y+z)+(g-h)*(g+h))/(2.0*h*y)
			g= pythag(f,1.0)
			if (f < 0.0)
				f= ((x-z)*(x+z)+h*(y/(f-g)-h))/x
			else
				f= ((x-z)*(x+z)+h*(y/(f+g)-h))/x
			// next QR transformation
			c= 1.0
			s= 1.0
			for (i=l+1; i< k+1; i++)
			{	
				g= e[i]
				y= q[i]
				h= s*g
				g= c*g
				z= pythag(f,h)
				e[i-1]= z
				c= f/z
				s= h/z
				f= x*c+g*s
				g= -x*s+g*c
				h= y*s
				y= y*c
				for (j=0; j < n; j++)
				{	
					x= v[j][i-1]
					z= v[j][i]
					v[j][i-1] = x*c+z*s
					v[j][i] = -x*s+z*c
				}
				z= pythag(f,h)
				q[i-1]= z
				c= f/z
				s= h/z
				f= c*g+s*y
				x= -s*g+c*y
				for (j=0; j < m; j++)
				{
					y= u[j][i-1]
					z= u[j][i]
					u[j][i-1] = y*c+z*s
					u[j][i] = -y*s+z*c
				}
			}
			e[l]= 0.0
			e[k]= f
			q[k]= x
		} 
	}
		
	//vt= transpose(v)
	//return (u,q,vt)
	for (i=0;i<q.length; i++) 
	  if (q[i] < prec) q[i] = 0
	  
	//sort eigenvalues	
	for (i=0; i< n; i++)
	{	 
	//writeln(q)
	 for (j=i-1; j >= 0; j--)
	 {
	  if (q[j] < q[i])
	  {
	//  writeln(i,'-',j)
	   c = q[j]
	   q[j] = q[i]
	   q[i] = c
	   for(k=0;k<u.length;k++) { temp = u[k][i]; u[k][i] = u[k][j]; u[k][j] = temp; }
	   for(k=0;k<v.length;k++) { temp = v[k][i]; v[k][i] = v[k][j]; v[k][j] = temp; }
//	   u.swapCols(i,j)
//	   v.swapCols(i,j)
	   i = j	   
	  }
	 }	
	}
	
	return {U:u,S:q,V:v}
};

},{"./mUtils":12,"./matrixs":14}],11:[function(require,module,exports){

var U = require('./mUtils');
require('./transpose');
require('./flatten');
require('./shape');
var matrix = require('./matrixs');


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
            yCopy.unshift(0);
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
            yCopy.unshift(0);
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

},{"./flatten":9,"./mUtils":12,"./matrixs":14,"./shape":19,"./transpose":22}],12:[function(require,module,exports){
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
        if((typeof M[0][0]) !='undefined') // 2D Copy 
        {
            for(var i = 0; i < M.length ; i++)
            {
                M_Array[i] = [];
                for(var j = 0; j < M[0].length ; j++)
                {
                    M_Array[i].push(M[i][j].valueOf());
                }
            }
        }
        else //Is 1D 
        {
            for(var i = 0; i < M.length ; i++)
            {
                M_Array[i] = M[i].valueOf();
            }
        }
    }
    return M_Array;
}
module.exports.matrix_copy = matrix_copy; 
},{}],13:[function(require,module,exports){
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
require('./pow');
require('./fill');
require('./apply');
require('./divide');
require('./lag');

Matrixs = require('./matrixs');
Matrixs.util = require('./mUtils');
},{"./add":1,"./apply":2,"./bound":3,"./create":4,"./delete":5,"./diag":6,"./divide":7,"./fill":8,"./flatten":9,"./invert":10,"./lag":11,"./mUtils":12,"./matrixs":14,"./multiply":15,"./pow":16,"./print":17,"./random":18,"./shape":19,"./stats":20,"./subtract":21,"./transpose":22}],14:[function(require,module,exports){
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
},{"./mUtils":12}],15:[function(require,module,exports){
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


},{"./mUtils":12,"./matrixs":14}],16:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');


// Returns Transpose of matrix
function matrix_pow(A,val){
    
    var M = []; 

    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j< A[0].length; j++)
        {
            M[i][j] = Math.pow(A[i][j],val);
        }
    }

    return M;
}

function matrix_square(A){
    
    var M = []; 

    for(var i = 0; i < A.length; i++)
    {
        M[i] = [];
        for(var j = 0; j< A[0].length; j++)
        {
            M[i][j] = Math.pow(A[i][j],2);
        }
    }

    return M;
}


//Add to parent class 
matrix.prototype.pow = function(val)
{
    var M = matrix_pow(this.value,val);
    return matrix.make(M);
};


//Add to parent class 
matrix.pow = function(A,val)
{
    return matrix.make(A).pow(val);
}


//Add to parent class 
matrix.prototype.square = function(val)
{
    var M = matrix_square(this.value);
    return matrix.make(M);
};


//Add to parent class 
matrix.square = function(A,val)
{
    return matrix.make(A).square(val);
}
},{"./matrixs":14}],17:[function(require,module,exports){
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

},{"./matrixs":14}],18:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var matrix = require('./matrixs');
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
},{"./matrixs":14,"./stats":20}],19:[function(require,module,exports){
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

matrix.prototype.catV = function(x)
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

matrix.prototype.catH = function(x)
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
},{"./mUtils":12,"./matrixs":14}],20:[function(require,module,exports){
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
},{"./mUtils":12,"./matrixs":14}],21:[function(require,module,exports){
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
},{"./add":1,"./mUtils":12,"./matrixs":14}],22:[function(require,module,exports){
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
},{"./matrixs":14}],23:[function(require,module,exports){
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
var u = require('../Matrixs/mUtils');


function numJacobian(X,modelObj)
{
    var J = [];
    var currParam = modelObj.param.slice(0);
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
        modelObj.param = currParam.slice(0);
    }
    return Matrixs.transpose(J);
}

module.exports = numJacobian; 
},{"../Matrixs/mUtils":12,"../Matrixs/matrix":13}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
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
Models.neuralNet = require('./neuralNet');
},{"./jacobian":23,"./line":24,"./neuralNet":26,"./power":27}],26:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var u = require('../Matrixs/mUtils');
require('../Matrixs/matrix');


function nnObj(obj)
{
    this.param;// = obj.x; //paramters 
    this.layerSizes;// = obj.layerSizes; 
    this.hasBias;// = obj.hasBias; 
    this.inputs;// = obj.inputs;
    this.outputs;// = obj.outputs;
};

var sigmoidFnc = function(x){return 1/(1+Math.exp(-x))}

nnObj.sigmoid = sigmoidFnc; 

nnObj.prototype.numFeatures = function()
{
    var numFeatures = 0; 
    this.createLayerArray();
    for(var i = 0; i < (this.layerArray.length-1); i++)
    {
        numFeatures += (this.layerArray[i]+1)*this.layerArray[i+1];
    }

    return numFeatures; 
}

nnObj.prototype.setInputNumber = function(num) 
{
    this.inputs = num;
}


nnObj.prototype.setOutputNumber = function(num) 
{
    this.outputs = num;
}


nnObj.prototype.setNumberLayers = function(num)
{
    this.hiddenLayers = num;
}


nnObj.prototype.setLayerSizes = function(num)
{
    this.layerSizes = num;
} 

nnObj.prototype.createLayerArray = function()
{
    this.layerArray = [];
    this.layerArray.push(this.inputs); // +1 cuz bias 
    for(var i = 0; i < this.layerSizes.length; i++)
    {
        this.layerArray.push(this.layerSizes[i]); // +1 cuz bias 
    }
    this.layerArray.push(this.outputs);
}

nnObj.prototype.randomizeParameters = function()
{
    var features = this.numFeatures();
    this.param = Matrixs.rand(features).multiply(2).subtract(1).flatten();
}

nnObj.prototype.init = function()
{
    this.randomizeParameters();
}

//Forward propogate through matrix 
nnObj.prototype.fnc = function(x)
{
    var M = []; // Result
    var paramIndex = 0; 
    var xLocal = Matrixs.make(x);
   
    for(var i = 0; i < (this.layerArray.length-1); i++)
    {
        //xLocal = xLocal.catHorizontal(Matrixs.ones(xLocal.value.length),1); // Append Bias array 
        xLocal = Matrixs.ones(xLocal.value.length,1).catHorizontal(xLocal); // Append Bias array 


        var featuresNum = xLocal.value[0].length; // How many features?
        var nextLayerSize = this.layerArray[i+1]; // Size of next layer? 
        // Fetch parameters coresponding to that layer
        var coeficentMatrix = this.param.slice(paramIndex,paramIndex+featuresNum*nextLayerSize);  
        paramIndex += featuresNum*nextLayerSize; // Update fetching index 
        coeficentMatrix = Matrixs.fill(coeficentMatrix,featuresNum,nextLayerSize); // Create parameter matrix
        
        xLocal = xLocal.multiply(coeficentMatrix); // Multiply prior layer by parameter matrix 
        xLocal = xLocal.apply(sigmoidFnc); //Apply sigmoid function to result 
    
} // itterate until final layer reached 
    return xLocal.value;
}

module.exports = nnObj;  



},{"../Matrixs/mUtils":12,"../Matrixs/matrix":13}],27:[function(require,module,exports){
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
},{}],28:[function(require,module,exports){
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
	
var yOverBound =1.1; 
var yUnderBound = 0.9;
var plotDataObjs = [];
var activePlotIndex = 0;
var plotArray = [];
var plotOptions = {};

Plots ={};

plotyLayout = { 
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    color: '#DDD',
    xaxis: {
            fixedrange: true
            },
    yaxis: {
        fixedrange:true,
    },
    height:250,
    width:500,
    margin: {
        l:40,
        r:5,
        b:30,
        t:5,
        pad:4
    },
    legend: {
        x:0.1,
        y:1
    }
};


var defaultScatterObj = {
    x :[],
    y :[],
    mode : 'markers',
    marker :{
        size : 20,
        colorscale : 'Viridis',
        opacity : 0.5,
    } 
}

var defaultLineObj = {
    x :[],
    y :[],
    mode : 'lines',
    color : 'rgba(255,0,0,1)',
    line : {},

}


function cloneObj(obj)
{
    return JSON.parse(JSON.stringify(obj));
}


// Highest level function for plot 
function plots(inputObj,options)
{
    activePlotIndex=0;
    plotArray = []; // Erase past data 
    plotOptions = options;
    var parsed = parse_data_obj(inputObj);
    var objTypes = parsed.type; 
    var inputObj = parsed.input; 
    prep_plot_data(inputObj,objTypes);
    //handle_plot_bounds(inputObj,objTypes);
    parseOptions();
    packageData(inputObj,objTypes);
    create_graph();
}
Plots.create = plots;


function add_plot(inputObj,options)
{
    activePlotIndex++;
    plotOptions = options;
    var parsed = parse_data_obj(inputObj);
    var objTypes = parsed.type; 
    var inputObj = parsed.input; 
    prep_plot_data(inputObj,objTypes);
    //handle_plot_bounds(inputObj,objTypes);
    parseOptions();
    packageData(inputObj,objTypes);
    create_graph();
}
Plots.add = add_plot;


module.exports = Plots;

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
        var numMatrixs = inputObj.filter(function(value){ return (value instanceof matrix)}).length;
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
    return {type:objType, input:inputObj};
}

function prep_plot_data(dataObj,objType)
{
    if(objType == 'Single Matrixs')
    {
        if(!Array.isArray(dataObj)) {
            dataObj = [dataObj]; // Make into array 
        }
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


/*
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
*/

function getColorArray(localObj)
{
    var dataSize = localObj.x.length;
    var M = Matrixs.range(dataSize).flatten();  
    
    return M;
}


// This function preps data for FLOTR2
function packageData(dataObj,objType)
{
    // It is assumed that datOBj is in a array; 
    var localData = null; 

    if(objType == 'Single Matrixs')
    {
        var localObj = {};
        
        if(Array.isArray(dataObj))
        {
            localData = dataObj[0];
        }
        else
        {
             localData = dataObj;
        }
       
        var dimensions = localData.shape()[1];
        var points = localData.shape()[0];

        if(dimensions==1)
        {
            var A = matrix.range(points);
            plotArray[activePlotIndex].x = A.flatten();
            plotArray[activePlotIndex].y = localData.flatten();

        }
        else // Assumes in proper format already
        {
             localObj.data = localData.value; 
        }
    }
    else
    {
        plotArray[activePlotIndex].x = dataObj[0].flatten();
        plotArray[activePlotIndex].y = dataObj[1].flatten();

        if((typeof dataObj[2]) !='undefined')
        {
            plotArray[activePlotIndex].type = 'scatter3d';
            plotArray[activePlotIndex].z = dataObj[2].flatten();
        }

    }
    var points = plotArray[activePlotIndex].x.length; 

    if((plotOptions.color == null) && (plotOptions.type=='scatter'))
    {
        plotArray[activePlotIndex].marker.color = plotArray[activePlotIndex].x;
    }

     if(plotOptions.type=='scatter')
    {
        var markerSize = plotArray[activePlotIndex].marker.size; 
        plotArray[activePlotIndex].marker.size = Matrixs.zeros(points).add(markerSize).flatten();
    }

}

function parseOptions()
{
    var plotType = 'lines';
    if((typeof plotOptions) == 'undefined')
    {
        plotArray[activePlotIndex] = cloneObj(defaultLineObj);
        plotOptions = {};
    }

    if((typeof plotOptions.type) != 'undefined')
    {
        if(plotOptions.type=='scatter')
        {
            plotType = 'scatter';
            plotArray[activePlotIndex] = cloneObj(defaultScatterObj);
        }
        else
        {
            plotArray[activePlotIndex] = cloneObj(defaultLineObj);
        }
    }
    else
    {
        plotOptions.type ='line';
        plotArray[activePlotIndex] = cloneObj(defaultLineObj);
    }  

    if((typeof plotOptions.color) != 'undefined')
    {
        if((plotType == 'scatter'))
        {
            plotArray[activePlotIndex].marker.color = plotOptions.color;
        }
        else
        {
            plotArray[activePlotIndex].line.color = plotOptions.color;
        }  
    }
    else
    {
        plotOptions.color = null; 
    }
    

    if((typeof plotOptions.opacity) != 'undefined')
    {
        if((plotType == 'scatter'))
        {
            plotArray[activePlotIndex].marker.opacity = plotOptions.opacity;
        }
        else
        {
             plotArray[activePlotIndex].opacity = plotOptions.opacity;
        }  
    }
    else
    {
        plotOptions.opacity = null; 
    }

    if((typeof plotOptions.size) != 'undefined')
    {
        if((plotType == 'scatter'))
        {
            plotArray[activePlotIndex].marker.size = plotOptions.size;
        }
        else
        {
            plotArray[activePlotIndex].line.width =  plotOptions.size;
        }  
    }

    if((typeof plotOptions.colorscale) != 'undefined')
    {
         plotArray[activePlotIndex].marker.colorscale = plotOptions.colorscale;
    }

    if((typeof plotOptions.name) != 'undefined')
    {
         plotArray[activePlotIndex].name = plotOptions.name;
    }

    if(typeof(plotyLayout.title) !='undefined')
    {
        if(plotyLayout.margin.t<25)
        {
            plotyLayout.margin.t = 25;
        }
    }
   
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


function create_graph()
{
    if((typeof Ploty) == 'undefined')
    {
        var Ploty = {};
    }

    if(typeof(plotOptions.div) == 'undefined')
    {
            if((document.getElementById('plotDiv')) == null )
            {
                createPlotDiv();
            }
            Plotly.purge('plotDiv');
            graph = Plotly.newPlot('plotDiv', plotArray,plotyLayout,{displayModeBar: false});
    }
    else
    {
        Plotly.purge(plotOptions.div);
        graph = Plotly.newPlot(plotOptions.div, plotArray,plotyLayout,{displayModeBar: false});
    }

    
}

},{"../Matrixs/matrix":13,"../Matrixs/matrixs":14}],29:[function(require,module,exports){


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
    
    var r = Matrixs.make(modelObj.fnc(dataObj.input)).subtract(dataObj.output);
    return r; 
}


// Equivalent: (y - y^) --> residuals || error 
function getResiduals(input,output,fnc,params)
{
    var r = Matrixs.make(output).subtract(fnc(input,params)); // y - y^
    return r; 
}
module.exports.getResiduals = getResiduals;


// Gets Numerical Jacobian, x --> 2D Array, fnc(x,params), params  
function getNumericalJacobian(x,fnc,params)
{
    var epsL = 1e-8;
	var currParam = params.slice(0); // Make 2 copies 
    var testParams = params.slice(0);
	var currValues = Matrixs.make(fnc(x,testParams)); // get values 
	testParams[0] += epsL; // add pertubation 
	var J = Matrixs.make(fnc(x,testParams)).subtract(currValues).multiply(1/epsL); // First column of J

	for(var j = 1; j< testParams.length; j++) // Loop each column 
	{
	testParams = currParam.slice(0); //clone orginal 
	testParams[j] += epsL; // add pertubation 
	var Ji = Matrixs.make(fnc(x,testParams)).subtract(currValues).multiply(1/epsL); // J column
	J = J.catHorizontal(Ji); // add to J matrix 
	}
	return J; // Matrixs obj 
}
module.exports.getNumericalJacobian = getNumericalJacobian;



function hasConverged(costArray,ittValues)
{
    var hasConverged = false; 
    var newCost = costArray[costArray.length-1];
    var oldCost = costArray[costArray.length-2];
    var change = Math.abs(newCost - oldCost); 
    
    if(newCost<0.001)
    {
        hasConverged = true;
    }
    else if((typeof ittValues) != 'undefined')
    {
        var newCost = Matrixs.make(ittValues[ittValues.length-1]);
        var oldCost = Matrixs.make(ittValues[ittValues.length-2]);
        var change = newCost.subtract(oldCost).rms(); 
        if(change < 0.001) // trust region expanding 
        {
             hasConverged = false;
             return hasConverged;
        }
    }
    
    if(change < 0.001)
    {
        hasConverged = true;
    }
    return hasConverged;
}

module.exports.get_jacobian = get_jacobian;
module.exports.get_residuals = get_residuals;
module.exports.hasConverged = hasConverged;
},{"../Matrixs/matrix":13,"../Models/models":25}],30:[function(require,module,exports){
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
},{"../Matrixs/matrix":13,"../Models/models":25,"./common":29}],31:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

require('../Matrixs/matrix');
require('../Models/models');
var u = require('../Matrixs/mUtils');
var comLib = require('./common'); 


function levenberg_marquardt(dataObj,modelObj,options)
{
    var resultObj = {};
    resultObj.itterationValues = [u.matrix_copy(modelObj.param)]; // This is the initial guess 
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
        //var stepPart = H.add(H.diag().multiply(lamda))
        var stepPart = H.add( Matrixs.ident(H.value.length , H.value.length).multiply(lamda) );
        var step = stepPart.pinv().multiply(J.transpose()).multiply(r);
        // step =  (H + lamda * diag(H))^(-1) * J^T * r // levenberg step 

        modelObj.param = Matrixs.subtract(modelObj.param, step.unroll()).unroll(); // Apply step, Update model coieficents
        r = comLib.get_residuals(dataObj,modelObj); //Get current error 
        newCost =  r.rms(); // store cost
        resultObj.itterationCost[i+1] = newCost; 

        if ((newCost > currCost)) // Was it a bad step? 
        {
            lamda *= 10; // Dampen step 
            modelObj.param = u.matrix_copy(resultObj.itterationValues[i]); // Revert to old model parameters   
        }
        else // Was a good step 
        {
            currCost = newCost;
            lamda *= 0.1;  
        } 

        resultObj.itterationValues[i+1] = u.matrix_copy(modelObj.param); //Store record of model coieficents
        
        if(comLib.hasConverged(resultObj.itterationCost,resultObj.itterationValues )) //check for convergence 
        {
            resultObj.convergence = true; 
            break; 
        }

    }

    resultObj.solution = u.matrix_copy(modelObj.param); 
    return resultObj;
}

module.exports = levenberg_marquardt; 

},{"../Matrixs/mUtils":12,"../Matrixs/matrix":13,"../Models/models":25,"./common":29}],32:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

require('../Matrixs/matrix');
require('../Models/models');
var u = require('../Matrixs/mUtils');
var comLib = require('./common'); 


//lmObj = {input:yourArray, output: yourArray, fnc: yourFunction, grad: optionalGradient
function levenberg_marquardtFnc(inputData,outputData,fnc,Xi,options)
{
   
    var x0 = Xi.slice();
    
    var resultObj = {};
    resultObj.itterationValues = [x0.slice()]; // This is the initial guess 
    var r = comLib.getResiduals(inputData,outputData,fnc,x0); // initial error 
    resultObj.itterationCost = [r.rms()]; // inital cost 
    var currCost = r.rms();
    var newCost = currCost;   
    var lamda = 0.001; 
    
    for(var i = 0 ; i < 50; i++)
    {
        r = comLib.getResiduals(inputData,outputData,fnc,x0); //Get current error 
        var J = comLib.getNumericalJacobian(inputData, fnc, x0);	
        J = J.multiply(-1); // This is because J is suppose to be residual gradient, not f grad 

        var H = J.transpose().multiply(J);
        //var stepPart = H.add(H.diag().multiply(lamda))

        H = H.add( Matrixs.ident(H.value.length).multiply(lamda) ); // Add damping paramater 
        
        var g = J.transpose().multiply(r)
        var step = H.pinv().multiply(g).flatten();

        // step =  (H + lamda * diag(H))^(-1) * J^T * r // levenberg step 

        x0 = Matrixs.subtract(x0, step).flatten(); // Apply step, Update model coieficents
        
        r = comLib.getResiduals(inputData,outputData,fnc,x0); //Get current error 
        
        newCost =  r.rms(); // store cost
        resultObj.itterationCost[i+1] = newCost; 

        if ((newCost > currCost)) // Was it a bad step? 
        {
            lamda *= 10; // Dampen step 
            x0 = u.matrix_copy(resultObj.itterationValues[i]); // Revert to old model parameters   
        }
        else // Was a good step 
        {
            currCost = newCost;
            lamda *= 0.1;  
        } 

        resultObj.itterationValues[i+1] = x0.slice(); //Store record of model coieficents
        
        if(comLib.hasConverged(resultObj.itterationCost,resultObj.itterationValues )) //check for convergence 
        {
            resultObj.convergence = true; 
            break; 
        }

    }

    resultObj.solution = x0.slice(); 
    return resultObj;
}

module.exports = levenberg_marquardtFnc; 

},{"../Matrixs/mUtils":12,"../Matrixs/matrix":13,"../Models/models":25,"./common":29}],33:[function(require,module,exports){
/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

require('../Matrixs/matrix');
require('../Models/models');
var u = require('../Matrixs/mUtils');
var comLib = require('./common'); 

//NZ 
//This algorithm is a simplificaiton of the trust region reflective algorithm 
//Special thanks to Nick Mayorov and his awesome blog post: 
// https://nmayorov.wordpress.com/2015/06/19/trust-region-reflective-algorithm/


// Solve a least squares problem with box constraints 
function bvlsqFnc(A,yTarget,lb,ub)
{
    //Prep initial variables 
    var resultObj = {};
    resultObj.convergence = false;
    var lB = prepBound(A,lb);
    var uB = prepBound(A,ub);
    var y = Matrixs.make(yTarget);
    var J = Matrixs.make(A); 
    J = J.multiply(-1); 
    var A = Matrixs.make(A);

    var x0 = Matrixs.make(A).lsq(yTarget); // Attempt vanilla solution 
    var c = makeStriclyFeasible(x0.value,lB,uB);
    
    if( c.boundViolations.rms() == 0 ) // if no bounds hit 
    {
        console.log('no bound violations found');
        return {solution:x0}; 
    }
    
    x0 = c.xClamped; // return clamped x0 solution

     r = y.subtract(A.multiply(x0));
     resultObj.itterationCost = [r.rms()]; // inital cost 
     resultObj.itterationValues = [x0.flatten()]; // This is the initial guess 

    for(var i = 0; i < 50; i++)
    {
        r = y.subtract(A.multiply(x0)); // r=  y - y^ 
        var g = J.transpose().multiply(r); // Formulate g = J^T * r
        var gDiag = Matrixs.makeDiag(g); // Make diag g
        var res = getVjV(x0.value,g.value,lB,uB); //Determine v & J_v
        var v = res[0];
        var Jv = Matrixs.makeDiag(res[1]); 
        var D2 = Matrixs.makeDiag(v); // D^2 = diag(v)
        var H = J.transpose().multiply(J); // Hessian approximation H = J^T * J

        // p = step = (D^2 * H + g * Jv)^(-1) * D^2 * g
        var step = D2.multiply(H).add(gDiag.multiply(Jv)).invert().multiply(D2.multiply(g)).multiply(-1);
        
        x0 = x0.add(step);

        var c = makeStriclyFeasible(x0.value,lB,uB); // Clamp any bound violations 
        x0 = c.xClamped; // return clamped x0 solution

        r = y.subtract(A.multiply(x0)); // r=  y - y^ 
        resultObj.itterationCost.push(r.rms()); // add to cost array 
        resultObj.itterationValues.push(x0.flatten()); // add paramater to paramarter array 

        if(checkConvergence(resultObj.itterationCost)) // has no benifical progress been made? 
        {
            resultObj.convergence = true; // a solution found 
            break; 
        }

    }
    resultObj.solution = x0; // store solution 
    
    return resultObj;

}

module.exports = bvlsqFnc; 

function prepBound(y,bound)
{
    var boundMatrix = 0;
    if(!Array.isArray(bound))
    {
        boundMatrix = Matrixs.zeros(y.length,1).add(bound).flatten();
    }
    else{
        boundMatrix = bound;
    }
    return boundMatrix; 
}

function getVjV(x,g,lb,ub)
{
    var M = [];
    var Ji = []; 
    for(var i = 0 ; i < x.length; i++)
    {
        M[i] = [];
        Ji[i] = [];
        if(g[i][0] < 0)
        {
            M[i][0] = (typeof(ub[i]) !='undefined') ? (ub[i] - x[i][0]) : 1;
            Ji[i][0] = (typeof(ub[i]) !='undefined') ? -1 : 0;   
        }
        else
        {
            M[i][0] = (typeof(lb[i]) !='undefined') ? (x[i][0] - lb[i]) : 1;  
            Ji[i][0] = (typeof(lb[i]) !='undefined') ? 1 : 0;  
        }
    }
    return [Matrixs.make(M) , Matrixs.make(Ji)];
}


function makeStriclyFeasible(x,lb,ub)
{
    var xNew = [];
    var boundViolation = []; 
    var epsL =0.00001;

    for(var i = 0; i < x.length; i++)
    {
        xNew[i] = [];

        if( x[i][0] >= ub[i] )
        {
            xNew[i][0] = ub[i] - epsL;
            boundViolation[i] = 1;
        }
        else if( x[i][0] <= lb[i] )
        {
             xNew[i][0] = lb[i] + epsL;
             boundViolation[i] = -1;
        }
        else
        {
            xNew[i][0] = x[i][0];
            boundViolation[i] = 0;
        } 
    }
    return {xClamped:Matrixs.make(xNew), boundViolations: Matrixs.make(boundViolation)};
}


},{"../Matrixs/mUtils":12,"../Matrixs/matrix":13,"../Models/models":25,"./common":29}],34:[function(require,module,exports){
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
},{"../Matrixs/matrix.js":13,"../Matrixs/matrixs.js":14}],35:[function(require,module,exports){
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
Solvers.levenbergMarquardtFnc = require('./levenbergMarquardtFnc');
Solvers.bvls = require('./lsqBounds.js');

require('./lsqr.js');

},{"./gaussNewton":30,"./levenbergMarquardt":31,"./levenbergMarquardtFnc":32,"./lsqBounds.js":33,"./lsqr.js":34}],36:[function(require,module,exports){
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
},{"./Matrixs/matrix":13,"./Models/models":25,"./Plots/plots":28,"./Solvers/solvers":35}]},{},[36]);
