

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