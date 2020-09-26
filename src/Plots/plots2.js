

var matrix = require('../matrix_lib.js');

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


defaultScatterObj = {
    x :[],
    y :[],
    mode : 'markers',
    marker :{
        size : 20,
        colorscale : 'Viridis',
        opacity : 0.5,
    } 
}

defaultLineObj = {
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
        objType = 'Single matrix';
    }
    else if(Array.isArray(inputObj))
    {
        var numMatrixs = inputObj.filter(function(value){ return (value instanceof matrix)}).length;
        if(numMatrixs==0)
        {
            objType = 'Single matrix';
            inputObj = matrix.make(inputObj);
        }
        else if(numMatrixs==1)
        {
            objType = 'Single matrix';
            inputObj = matrix.make(inputObj[0]);
        }
        else if(numMatrixs>1)
        {
            objType = 'Multiple matrix';
        } 
    }
    return {type:objType, input:inputObj};
}

function prep_plot_data(dataObj,objType)
{
    if(objType == 'Single matrix')
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


function getColorArray(localObj)
{
    var dataSize = localObj.x.length;
    var M = matrix.range(dataSize).flatten();  
    
    return M;
}


// This function preps data for FLOTR2
function packageData(dataObj,objType)
{
    // It is assumed that datOBj is in a array; 
    var localData = null; 

    if(objType == 'Single matrix')
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
        plotArray[activePlotIndex].marker.size = matrix.zeros(points).add(markerSize).flatten();
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

    
    
    var plot_div_id = plotOptions.div == null ? 'plotDiv' : plotOptions.div;
    var plot_div_dom = document.querySelector('#'+plot_div_id);

    if(plot_div_dom == null){
        createPlotDiv();
    }
    Plotly.purge(plot_div_id);
    handle_auto_size(plot_div_id);
    graph = Plotly.newPlot(plot_div_id, plotArray,JSON.parse(JSON.stringify(plotyLayout)),{displayModeBar: false});
    
}


function handle_auto_size(plotDivID){
    var divs = document.querySelector('#'+plotDivID);
    if(plotOptions.height == null){
        plotyLayout.height = divs.getBoundingClientRect().height;
    }
    if(plotOptions.width == null){
        plotyLayout.width = divs.getBoundingClientRect().width;
    }    

}

module.exports = Plots;