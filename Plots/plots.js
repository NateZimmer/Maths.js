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

    options = (typeof(options) == 'undefined') ? {} : options; // account for null case  

    plotOptions = options;
    var parsed = parse_data_obj(inputObj);
    var objTypes = parsed.type; 
    var inputObj = parsed.input; 
    prep_plot_data(inputObj,objTypes);
    //handle_plot_bounds(inputObj,objTypes);
    parseOptions();
    packageData(inputObj,objTypes);
    if(typeof(options.noDraw) != 'undefined')
    {
        if(options.noDraw == false)
        {
            create_graph();
        }
    }
    else
    {
        create_graph();
    }

}
Plots.create = plots;


function add_plot(inputObj,options)
{
    activePlotIndex++;
    options = (typeof(options) == 'undefined') ? {} : options; // account for null case  
    plotOptions = options;
    var parsed = parse_data_obj(inputObj);
    var objTypes = parsed.type; 
    var inputObj = parsed.input; 
    prep_plot_data(inputObj,objTypes);
    //handle_plot_bounds(inputObj,objTypes);
    parseOptions();
    packageData(inputObj,objTypes);

    if(typeof(options.noDraw) != 'undefined')
    {
        if(options.noDraw == false)
        {
            create_graph();
        }
    }
    else
    {
        create_graph();
    }

}
Plots.add = add_plot;

function redraw_plot(options)
{
      create_graph();
}
Plots.reDraw = redraw_plot;


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
        else if (plotOptions.type=='spline')
        {
            plotOptions.type ='line';
            plotArray[activePlotIndex] = cloneObj(defaultLineObj);
            plotArray[activePlotIndex].line.shape='spline';
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


    if((typeof plotOptions.symbol) != 'undefined')
    {
        if((plotType == 'scatter'))
        {
            plotArray[activePlotIndex].marker.symbol = plotOptions.symbol;
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
            graph = Plotly.newPlot('plotDiv', plotArray,JSON.parse(JSON.stringify(plotyLayout)),{displayModeBar: false});
    }
    else
    {
        Plotly.purge(plotOptions.div);
        graph = Plotly.newPlot(plotOptions.div, plotArray,JSON.parse(JSON.stringify(plotyLayout)),{displayModeBar: false});
    }

    
}

function addTrace()
{
    graph = Plotly.addTraces(plotOptions.div, plotArray[plotArray.length-1]); // add latest trace to graph 
}
