

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