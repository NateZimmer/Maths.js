/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

function Matrixs(M)
{
	this.value = M;
	this.name ='Matrixs';
}

(function()
{
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

	//Returns the index of a max val in a array
	function indexOfMax(arr) {
		if (arr.length === 0) {
			return -1;
		}

		var max = arr[0];
		var maxIndex = 0;

		for (var i = 1; i < arr.length; i++) {
			if (arr[i] > max) {
				maxIndex = i;
				max = arr[i];
			}
		}

		return maxIndex;
	}
	
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

	function isMatrix(A)
	{
		var returnVal = false; 
		if((typeof A.M) !='undefined')
		{
			returnVal = true; 
		}
		return returnVal;
	}
	
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

	function matrix_clamp(X,lb,ub)
	{
		var error = [];
		var x = [];

		if(is1D(X))
		{
			for(var i = 0 ; i < X.length;i++)
			{
				var errorVal = (X[i]>ub) ? (X[i] - ub) : (X[i]<lb) ? (X[i] - lb) : 0; // Clamp
				error.push(errorVal);
				x.push(X[i] - errorVal);  
			}
		}
		else if(is2D(X))
		{
			for(var i = 0; i < X.length; i++)
			{
				x.push([]);
				error.push([]);
				for(var j = 0; j < X[0].length; j++)
				{
					var errorVal = (X[i][j]>ub) ? (X[i][j] - ub) : (X[i][j]<lb) ? (X[i][j] - lb) : 0; // Clamp
					error[i].push(errorVal);
					x[i].push(X[i][j] - errorVal);  
				}
			}
		}
		return [x,error];
	}
	
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

	function matrix_add(A,B)
	{
		M = [];
		var returnVal = 'Dimension Error';

		var bIsScalar = false; 

		if(isScalar(B))
		{
			B = getScalar(B);
			returnVal = matrix_add_scalar(A,B);
		}
		else if(is2D(A) && is2D(B) && matrix_compare_size(A,B)) 
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

	function matrix_subtract(A,B)
	{
		M = [];
		var returnVal = 'Dimension Error';

		var bIsScalar = false; 

		if(isScalar(B))
		{
			B = getScalar(B);
			returnVal = matrix_add_scalar(A,-B);
		}
		else if(is2D(A) && is2D(B) && matrix_compare_size(A,B)) 
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

	function matrix_multiply_same(A,B)
	{
		var M = []; 
		var matrix1D = is1D(A);
		
		if(matrix1D)
		{
			for(var i = 0; i < A.length; i++)
			{
				M[i] = A[i] * B[i];
			}
		}
		else
		{
			for(var i = 0; i < A.length; i++)
			{
				M[i] = [];
				for(var j = 0; j< A[0].length; j++)
				{
					M[i][j] = A[i][j] * B[i][j];
				}
			}
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
	
	function isMatrixMultiplyValid(A,B)
	{
		var returnVal = false;
		var demA = matrix_demension(A);
		var demB = matrix_demension(B);

		if(demA[1] == demB[0])
		{
			returnVal = true;
		}
		return returnVal;
	}

	function matrix_multiply2(A,B)
	{
		var returnVal = 0;
		var bIsScalar = isScalar(B);
		var matrixSameSize = matrix_compare_size(A,B);

		if(bIsScalar)
		{
			B = getScalar(B);
			returnVal = matrix_multiplyc(A,B);	
		}
		else if(matrixSameSize)
		{
			returnVal = matrix_multiply_same(A,B);
		}
		else if(isMatrixMultiplyValid(A,B))
		{
			returnVal = matrix_multiply(A,B);
		}
		else
		{
			returnVal = 'Invalid';
		}

		return returnVal;
	}


	function matrix_add_scalar(A,c)
	{
		var resultMatrix = [];
		var rows = A[0].length;
		
		if(rows==undefined) // If column matrix
		{
			rows =1;
			for(var i = 0; i < A.length; i++)
			{
				resultMatrix[i] = A[i] + c;
			}
		}
		else // else 2d matrix
		{
			for(var i = 0; i < A.length; i++)
			{
				resultMatrix[i] = [];
				for(var j = 0; j< rows;j++)
				{
					resultMatrix[i][j] = A[i][j] + c;

				}
			}
		}
		return resultMatrix;
	}

	function matrix_decimate(A,j)
	{
		var M = [];
		
		if((j == 0) || (j == 1))
		{
			return A;
		}
		
		var mLength = Math.floor(A.length/j);
		
		for(var i = 0; i < mLength; i++)
		{
			M.push(A[i*j]);
		}
		return M;
	}

	
	function matrix_cat_horizontal2(A,B)
	{
		var M = [];
		
		if(A.length != B.length)
		{
			throw 'Must have same number of rows'
		}			
		
		M = matrix_copy(A);
		for(var i =0; i<M.length;i++) // for rows of M
		{
			M[i] = M[i].concat(B[i]);
		}
		return M;
	}
	
	function matrix_cat_horizontal(A,B)
	{
		var M = [];

		if(A[0].length == undefined) // if A is 1D
		{
			if(B[0].length == undefined) // if B is 1D
			{
				for(var i = 0; i < A.length; i++)
				{
					M[i]=[];
					M[i][0] = A[i];
					M[i][1] = B[i];
				}
			}
		}
		else
		{
			M = matrix_copy(A);
			for(var i =0; i<M.length;i++) // for rows of M
			{
				M[i] = M[i].concat(B[i]);
			}

		}
		return M;
	}

	//Returns the index of a min val in a array
	function indexOfMin(arr) {
		if (arr.length === 0) {
			return -1;
		}

		var max = arr[0];
		var maxIndex = 0;

		for (var i = 1; i < arr.length; i++) {
			if (arr[i] < max) {
				maxIndex = i;
				max = arr[i];
			}
		}

		return maxIndex;
	}

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

	// Returns column of index
	function GC(M,index)
	{
		const col = index;
		var M_Column = [M.map(function(value,index){return value[col];})]; //Gets Column 
		return M_Column;
	}


	// Returns 1D column vector 
	function MGC(M,index)
	{
		const col = index;
		var M_Column = M.map(function(value,index){return value[col];}); //Gets Column 
		return M_Column;
	}

	// Returns an array from the listed range
	function matrix_create_array(start,end)
	{
		var myArray = [];
		if(end == undefined)
		{
			for(var i =0; i<start;i++)
			{
				myArray.push(0);
			}
			return myArray;
		}
		else
		{
		
			for (i =start; i<end; i++)
			{
				myArray.push(i);
			}
			return myArray;
		}
	}

	function matrix_multiply(m1, m2) {
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

	// Returns a matrix lagged by the given amount 
	function matrix_lag(M,Lag_Order)
	{
		var M_Lag = M.slice();
		for(var i = 0; i < Lag_Order; i++)
		{
			M_Lag.unshift(M[0]); // Add element to start of array
			M_Lag.pop(); // Remove last element of array
		}
		return M_Lag;
	}

	// Returns a matrix lagged by the given amount 
	function matrix_lag_2d(M,Lag_Order)
	{
		var M_Lag = M.map(function(arr) {return arr.slice();});
		for(var i = 0; i < Lag_Order; i++)
		{
			M_Lag[0].unshift(M[0][0]); // Add element to start of array
			M_Lag[0].pop(); // Remove last element of array
		}
		return M_Lag;
	}
	
	// Changes from 2D to 1D
	function matrix_flatten(M)
	{
		return ([].concat.apply([], M));
	}

	//matrix max

	function getMaxOfArray(numArray) {
	  return Math.max.apply(null, matrix_flatten(numArray));
	}
	
	function getMinOfArray(numArray) {
	  return Math.min.apply(null, matrix_flatten(numArray));
	}

	function getSumOfMatrix(matrixInput)
	{
		return matrix_flatten(matrixInput).reduce(function(a, b) { return a + b; }, 0);
	}
	
	function matrix_length(M)
	{
		return matrix_flatten(M).length;
	}

	function matrix_display(m) {
	  var printString = '';
	  for (var r = 0; r < m.length; ++r) {
		  printString += m[r].toString()+'\n';
	  }
	  console.log(printString);
	}

	function matrix_html(m) {
	  for (var r = 0; r < m.length; ++r) {
		console.log('&nbsp;&nbsp;'+m[r].join(' ')+'<br />');
	  }
	}

	function matrix_max(A)
	{
		return A[indexOfMax(A)];
	}

	function matrix_min(A)
	{
		return A[indexOfMin(A)];
	}

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

	//Parses Matrix
	function parse_matrix(text){
		// normalize the input so stuff is separated by 1 space and 1 newline
		text = text.replace(/\r|\n/g,'\n').replace(/\n+/g,'\n');
		text = text.replace(/,|;|\||\t| /g,' ').replace(/ /g,' ');

		var textRows = text.split('\n');
		var M = [];
		var i,il=textRows.length;
		var j,jl,cols;
		for( i=0; i<il; i+=1 ){
			M.push([]);
			cols = textRows[i].split(' ');
			jl = cols.length;
			for( j=0; j<jl; j+=1 ){
				M[i].push( parseFloat(cols[j]) );
			}
		}

		return M;
	}
	
	function matrix_push(A,B)
	{
		var aColumns = A[0].length;
		var bColumns = B[0].length;
		var M = matrix_copy(A);
		
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

	function matrix(A)
	{
		this.M = A,
		this.transpose = function()
		{
			this.M = matrix_transpose(this.M);
		}
		this.invert = function()
		{
			this.M = matrix_invert(this.M);
		}
		this.max = function()
		{
			var values = this.M.concat.apply([],this.M);
			return Math.max.apply(null, values);
		}
		this.size = function()
		{
			var rows = this.M.length;
			var cols = this.M[0].length;
			return [rows,cols];
		}
		this.multiply = function(A)
		{
			if( A.M != undefined) {
				this.M = matrix_multiply(this.M,A.M);
			}
			else if(A.length != undefined)
			{
				this.M = matrix_multiply(this.M,A);
			}
			else
			{
				this.M = matrix_multiplyc(this.M,A);
			}
		}
		this.rows = function()
		{
			return this.M.length;
		}
		this.cols = function()
		{
			return this.M[0].length;
		}
		this.col = function(col_num)
		{
			return MGC(this.M,row_num);
		}
		this.row = function(row_num)
		{
			return this.M[row_num];
		}
		this.print = function()
		{
			matrix_display(this.M);
		}
	}

	matrix.ones = function(rows,cols)
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
		return new matrix(M);
	}

	matrix.transpose = function(A)
	{
		var M;
		if(A.M != undefined)
		{
			M = matrix_transpose(A.M);
		}
		else
		{
			M = matrix_transpose(A);
		}
		return new matrix(M);
	}

	matrix.ident = function(rows,cols)
	{
		var M=[];
		var mValue = 0;
		for(var i = 0; i<rows;i++)
		{
			M[i]=[];
			for(var j=0; j<cols;j++)
			{
				mValue = (i==j) ? 1 : 0;
				M[i].push(mValue);
			}
		}
		return new matrix(M);
	}

	matrix.zeros = function(rows,cols)
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
		return new matrix(M);
	}

	matrix.multiply = function(A , B)
	{
		if((A.M != undefined) && (B.M != undefined)) // is of type matrix 
		{
			return new matrix(matrix_multiply(A.M,B.M));
		}
		else
		{
			return new matrix(matrix_multiplyc(A.M,B));
		}
	}

	matrix.lagArray = function(A,start,end)
	{
		var M = [];
		if(A.M != undefined) // is of type matrix 
		{
			var j = 0;
			for(var i = start; i<end;i++)
			{
				M[j] =matrix_lag_2d(A.M,i)[0];
				j++;
			}
		}
		else if(A[0].length == undefined) // is a single dimension 
		{
			var j = 0;
			for(var i = start; i<end;i++)
			{
				M[j] =matrix_lag(A,i);
				j++;
			}
		}
		else
		{
			var j = 0;
			for(var i = start; i<end;i++)
			{
				M[j] =matrix_lag_2d(A,i)[0].slice();
				j++;
			}
		}
		return new matrix(M);
	}

	matrix.cat = function(A,B)
	{
		var M = [];
		var num_a_rows = A.rows();
		var num_b_rows = B.rows();
		
		for(var i =0; i <num_a_rows;i++)
		{
			M[i] = A.row(i);
		}
		for(var i =0; i <num_b_rows;i++)
		{
			M[i+num_a_rows] = B.row(i);
		}
		return new matrix(M);
	}

	matrix.add = function(A,B)
	{
		M = [];
		
		if((A.M != undefined) && (B.M != undefined)) // is of type matrix 
		{
			for(var i =0; i<A.rows(); i++)
			{
				M[i] = [];
				for(var j = 0; j<A.cols();j++)
				{
					M[i][j] = A.M[i][j]+B.M[i][j];
				}
			}
		}
		else
		{
			for(var i =0; i<A.rows(); i++)
			{
				M[i] = [];
				for(var j = 0; j<A.cols();j++)
				{
					M[i][j] = A.M[i][j]+B;
				}
			}
		}

		return new matrix(M);
	}

	matrix.subtract = function(A,B)
	{
		M = [];
		
		if((A.M != undefined) && (B.M != undefined)) // is of type matrix 
		{
			for(var i =0; i<A.rows(); i++)
			{
				M[i] = [];
				for(var j = 0; j<A.cols();j++)
				{
					M[i][j] = A.M[i][j]-B.M[i][j];
				}
			}
		}
		else
		{
			for(var i =0; i<A.rows(); i++)
			{
				M[i] = [];
				for(var j = 0; j<A.cols();j++)
				{
					M[i][j] = A.M[i][j]-B;
				}
			}
		}

		return new matrix(M);
	}

	matrix.norm = function(A)
	{
		var normValue = 0;
		if((A.M != undefined)) // is of type matrix 
		{
			var values = A.M.concat.apply([],A.M);
			for(var i =0; i< values.length; i++)
			{
				normValue += values[i]*values[i];
			}
			normValue =Math.sqrt(normValue);
		}
		return normValue;
	}

	matrix.mean = function(A)
	{
		var meanValue = 0;
		if((A.M != undefined)) // is of type matrix 
		{
			var values = A.M.concat.apply([],A.M);
			for(var i =0; i< values.length; i++)
			{
				meanValue += values[i];
			}
			meanValue = meanValue/values.length;
		}
		return meanValue;
	}

	matrix.fit = function(A,B)
	{
		var Fit = 0;
		if((A.M != undefined) && (B.M != undefined)) // is of type matrix 
		{
			Fit = 1-(matrix.norm(matrix.subtract(A,B)))/(matrix.norm(matrix.subtract(A,matrix.mean(A))));
		}
		return Fit;
	}

	function print_matrix(M){
		var nRows = M.length;
		var nColumns = M[0].length;
		var i;
		var textString = '';
		for(var i=0; i<nRows; i+=1 ){
			for(var j = 0; j <nColumns; j++)
			{
				textString +=M[i][j].toFixed(3)+'\t\t'
			}
			textString = textString.substr(0,textString.length-2); // Remove extra
			textString += '\n';
		}
		textString = textString.substr(0,textString.length-1); // Remove extra line return 
		return textString;
	}
	
	function mm(M)
	{
		return (new Matrixs(M));
	}
	
	Matrixs = function(M)
	{
		if(isScalar(M))
		{
			this.value = [[M]];
		}
		else if(is1D(M))
		{
			this.value = [M];
		}
		else if(is2D(M))
		{
			this.value = M;
		}
		else if(isMatrixs(M))
		{
			this.value = M.value;
		}
		this.name ='Matrixs';
		return this;
	};
	
	Matrixs.prototype.add = function(x)
	{
		this.value = matrix_add(this.value,mm(x).value);
		return this; 
	};
	
	Matrixs.add = function(A,B)
	{
		return new Matrixs(matrix_add(mm(A).value,mm(B).value));
	}
	
	Matrixs.prototype.subtract = function(x)
	{
		this.value = matrix_subtract(this.value,mm(x).value);
		return this;
	};
	
	
	Matrixs.prototype.rows = function(i,j)
	{
		
		this.value = matrix_subtract(this.value,mm(x).value);
		return this;
	};
	
	
	Matrixs.prototype.push = function(x)
	{
		this.value = matrix_push(this.value,mm(x).value);
		return this;
	};
	
	Matrixs.catVertical = function(A,B)
	{
		return new Matrixs(matrix_push(mm(A).value,mm(B).value));
	}
	
	Matrixs.prototype.catVertical = function(x)
	{
		this.value = matrix_push(this.value,mm(x).value);
		return this;
	};	
	
	Matrixs.catHorizontal = function(A,B)
	{
		return new Matrixs(matrix_cat_horizontal2(mm(A).value,mm(B).value));
	}
	
	Matrixs.prototype.catHorizontal = function(x)
	{
		this.value = matrix_cat_horizontal2(this.value,mm(x).value);
		return this;
	};	
	
	Matrixs.subtract = function(A,B)
	{
		return new Matrixs(matrix_subtract(mm(A).value,mm(B).value));
	}
	
	Matrixs.prototype.multiply = function(x)
	{
		this.value = matrix_multiply2(this.value,mm(x).value);
		return this;
	};
	
	Matrixs.multiply = function(A,B)
	{
		return new Matrixs(matrix_multiply2(mm(A).value,mm(B).value));
	}
	
	Matrixs.prototype.columns = function(start,end)
	{
		return new Matrixs(matrix_get_columns(this.value,start,end));
	}
	
	Matrixs.columns = function(A,start,end)
	{
		return new Matrixs(matrix_get_columns(mm(A).value,start,end));
	}
	
	Matrixs.prototype.column = function(start)
	{
		return new Matrixs(matrix_get_columns(this.value,start));
	}
	
	Matrixs.column = function(A,start)
	{
		return new Matrixs(matrix_get_columns(mm(A).value,start));
	}
	
	Matrixs.prototype.rows = function(start,end)
	{
		return new Matrixs(matrix_get_rows(this.value,start,end));
	}
	
	Matrixs.rows = function(A,start,end)
	{
		return new Matrixs(matrix_get_rows(mm(A).value,start,end));
	}
	
	Matrixs.prototype.row = function(start)
	{
		return new Matrixs(matrix_get_rows(this.value,start));
	}
	
	Matrixs.row = function(A,start)
	{
		return new Matrixs(matrix_get_rows(mm(A).value,start));
	}
	
	Matrixs.prototype.mean = function()
	{
		return matrix_mean(this.value);
	};
	
	Matrixs.prototype.min = function()
	{
		return getMinOfArray(this.value);
	};
	
	Matrixs.prototype.max = function(x)
	{
		return getMaxOfArray(this.value);
	};
	
	Matrixs.prototype.sum = function()
	{
		return getSumOfMatrix(this.value);
	};
	
	Matrixs.prototype.length = function()
	{
		return matrix_length(this.value);
	};
	
	Matrixs.prototype.transpose = function()
	{
		this.value = matrix_transpose(this.value);
		return this;
	};
	
	Matrixs.transpose = function(A)
	{
		return new mm(A).transpose();
	}
	
	Matrixs.prototype.shape = function()
	{
		return matrix_demension(this.value);
	};
	
	Matrixs.prototype.invert = function()
	{
		this.value = matrix_invert(this.value);
		return this;
	};
	
	Matrixs.invert = function(A)
	{
		return new Matrixs(matrix_invert(mm(A).value));
	}
	
	Matrixs.prototype.print = function()
	{
		return print_matrix(this.value);
	};
	
})();


