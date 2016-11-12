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


