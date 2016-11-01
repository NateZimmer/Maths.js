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
