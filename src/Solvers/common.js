

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