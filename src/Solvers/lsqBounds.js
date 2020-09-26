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
function bvls(A,yTarget,lb,ub)
{
    //Prep initial variables 
    var resultObj = {};
    resultObj.convergence = false;
    var lB = prepBound(A,lb); //Creates an array of bounds 
    var uB = prepBound(A,ub);
    var y = Matrixs.make(yTarget);
    var J = Matrixs.make(A); 
    J = J.multiply(-1); 
    var A = Matrixs.make(A);

    var x0 = Matrixs.make(A).lsq(yTarget); // Attempt vanilla solution 
    var c = makeStriclyFeasible(x0.value,lB,uB);
    
    if( c.boundViolations.rms() == 0 ) // if no bounds hit 
    {
        return {solution:x0}; 
    }
    
    x0 = c.xClamped; // return clamped x0 solution

     r = y.subtract(A.multiply(x0));
     resultObj.itterationCost = [r.rms()]; // inital cost 
     resultObj.itterationValues = [x0.flatten()]; // This is the initial lsq clamped solution 

    for(var i = 0; i < 50; i++)
    {
        r = y.subtract(A.multiply(x0)); // r=  y - y^ 
        var g = J.transpose().multiply(r); // Formulate g = J^T * r
        var gDiag = Matrixs.makeDiag(g); // Make diag g
        var res = getVjV(x0.value,g.value,lB,uB); //Determine v & J_v
        var v = res[0];
        var Jv = Matrixs.makeDiag(res[1]); 
        //var D2 = Matrixs.makeDiag(v); // D^2 = diag(v)
        var D2 = Matrixs.makeDiag(v.pow(-1));
        
        var H = J.transpose().multiply(J); // Hessian approximation H = J^T * J

        // p = step = (D^2 * H + g * Jv)^(-1) * D^2 * g
        //var step = D2.multiply(H).add(gDiag.multiply(Jv)).invert().multiply(D2.multiply(g)).multiply(-1);
        var step = H.add(D2.multiply(gDiag.multiply(Jv))).invert().multiply(g).multiply(-1);

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

module.exports.bvls = bvls; 


function bvlsFnc(A,fnc,yTarget,lb,ub)
{
    //Prep initial variables 
    var resultObj = {};
    resultObj.convergence = false;
    var lB = prepBound(A,lb); //Creates an array of bounds 
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

     r = y.subtract(fnc(x0.value,x0.flatten()));
     resultObj.itterationCost = [r.rms()]; // inital cost 
     resultObj.itterationValues = [x0.flatten()]; // This is the initial lsq clamped solution 

    for(var i = 0; i < 50; i++)
    {
        r = y.subtract(fnc(x0.value,x0.flatten())); // r=  y - y^ 
        var g = J.transpose().multiply(r); // Formulate g = J^T * r
        var gDiag = Matrixs.makeDiag(g); // Make diag g
        var res = getVjV(x0.value,g.value,lB,uB); //Determine v & J_v
        var v = res[0];
        var Jv = Matrixs.makeDiag(res[1]); 
        //var D2 = Matrixs.makeDiag(v); // D^2 = diag(v)
        var D2 = Matrixs.makeDiag(v.pow(-1));
        
        var H = J.transpose().multiply(J); // Hessian approximation H = J^T * J

        // p = step = (D^2 * H + g * Jv)^(-1) * D^2 * g
        //var step = D2.multiply(H).add(gDiag.multiply(Jv)).invert().multiply(D2.multiply(g)).multiply(-1);
        var step = H.add(D2.multiply(gDiag.multiply(Jv))).invert().multiply(g).multiply(-1);

        x0 = x0.add(step);

        var c = makeStriclyFeasible(x0.value,lB,uB); // Clamp any bound violations 
        x0 = c.xClamped; // return clamped x0 solution

        r = y.subtract(fnc(x0.value,x0.flatten())); // r=  y - y^ 
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
module.exports.bvlsFnc = bvlsFnc; 


function bvlsMod(A,model,yTarget,lb,ub)
{
    //Prep initial variables 
    var resultObj = {};
    resultObj.convergence = false;
    var lB = prepBound(A,lb); //Creates an array of bounds 
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

     r = y.subtract(fnc(x0.value,x0.flatten()));
     resultObj.itterationCost = [r.rms()]; // inital cost 
     resultObj.itterationValues = [x0.flatten()]; // This is the initial lsq clamped solution 

    for(var i = 0; i < 50; i++)
    {
        r = y.subtract(fnc(x0.value,x0.flatten())); // r=  y - y^ 
        var g = J.transpose().multiply(r); // Formulate g = J^T * r
        var gDiag = Matrixs.makeDiag(g); // Make diag g
        var res = getVjV(x0.value,g.value,lB,uB); //Determine v & J_v
        var v = res[0];
        var Jv = Matrixs.makeDiag(res[1]); 
        //var D2 = Matrixs.makeDiag(v); // D^2 = diag(v)
        var D2 = Matrixs.makeDiag(v.pow(-1));
        
        var H = J.transpose().multiply(J); // Hessian approximation H = J^T * J

        // p = step = (D^2 * H + g * Jv)^(-1) * D^2 * g
        //var step = D2.multiply(H).add(gDiag.multiply(Jv)).invert().multiply(D2.multiply(g)).multiply(-1);
        var step = H.add(D2.multiply(gDiag.multiply(Jv))).invert().multiply(g).multiply(-1);

        x0 = x0.add(step);

        var c = makeStriclyFeasible(x0.value,lB,uB); // Clamp any bound violations 
        x0 = c.xClamped; // return clamped x0 solution

        r = y.subtract(fnc(x0.value,x0.flatten())); // r=  y - y^ 
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
module.exports.bvlsMod = bvlsMod; 



function checkConvergence(ittCosts)
{

    var index = ittCosts.length -1; 
    var prevCost = ittCosts[index -1] 
    var currCost = ittCosts[index];
    var costChange = Math.abs(currCost - prevCost);
    var hasConverged = (costChange <0.0001) ? true : false;
    return hasConverged; 
}

function prepBound(y,bound)
{
    var boundMatrix = 0;
    if(!Array.isArray(bound))
    {
        if(A instanceof Matrixs)
        {
             boundMatrix = Matrixs.zeros(y.value[0].length,1).add(bound).flatten();
        }
        else
        {
            boundMatrix = Matrixs.zeros(y[0].length,1).add(bound).flatten();
        }
        
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

