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

