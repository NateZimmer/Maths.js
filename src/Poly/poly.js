
Matrixs = require('./matrixs');

PolyLib = require('./poly');


function polyMultiply(polyOne,polyTwo)
{
	var polyOneOrder = polyOne.length -1;
	var polyTwoOrder = polyTwo.length -1;
	var maxPolyOrder = polyTwoOrder + polyOneOrder; 

	var M = Matrixs.zeros(1,maxPolyOrder+1);
	var temp =  Matrixs.zeros(1,maxPolyOrder+1);

	for(var i = 0; i < polyOne.length; i++)
	{
		for(var j = 0; j < polyTwo.length; j++)
		{
			temp.value[0][j+i] = polyOne[i]*polyTwo[j]
		}
		M = M.add(temp);
		temp = temp.multiply(0);
	}
	return M.flatten();
}


function polyAdd(polyOne,polyTwo)
{
    var poly1 = Matrixs.make(polyOne).flatten();
    var poly2 = Matrixs.make(polyTwo).flatten();
	var polyOneOrder = poly1.length;
	var polyTwoOrder = poly2.length;
	var maxPolyOrder = Math.max(polyOneOrder,polyTwoOrder);
    var M = Matrixs.zeros(1,maxPolyOrder).flatten();

    for(var i = 0 ; i < polyOneOrder; i++)
    {
        M[i] += poly1[i];
    }
    for(var i = 0 ; i < polyTwoOrder; i++)
    {
        M[i] += poly2[i];
    }
	return M;
}


function polyPow(polyOne,powVal)
{
    var poly1 = Matrixs.make(polyOne).flatten();
    var polyOneOrder = poly1.length;
    var M = Matrixs.clone(poly1).flatten();
    for(var i = 0; i < powVal - 1; i++)
    {
        M = polyMultiply(Matrixs.clone(M).flatten(),poly1)
    }
    return M;
}


function eulerDiffPoly(polyOne,timeStep)
{
    var poly1 = Matrixs.make(polyOne).flatten();
    var polyOneOrder = poly1.length;
    var M = [poly1[0]];
    for(var i = 1; i < polyOneOrder; i++)
    {
        var temp = polyMultiply([-1,1],[timeStep]);
        var power = polyPow(temp,i);
        var final = polyMultiply(power,[poly1[i]]);
        M = polyAdd(Matrixs.clone(M).flatten(),final);
    }
    console.log('wtf');
    return M;
}



function tf(numerator,denominator,type,timeStep,obj)
{
    this.numerator = Matrixs.make(numerator).flatten();
    this.numOrder = this.numerator.length;
    this.denominator = Matrixs.make(denominator).flatten();
    this.denOrder =  this.denominator.length;
    
    this.type = type;
    this.timeStep = timeStep;
    var icDefined = false; 
    if(typeof(obj) !='undefined')
    {
       if((typeof(obj.numIc) !='undefined') && (typeof(obj.denIc) !='undefined') )
       {
            icDefined = true;
            this.numIc = Matrixs.make(obj.numIc).flatten();
            this.denIc = Matrixs.make(obj.denIc).flatten();
       }
    }
    if(!icDefined)
    {
        this.numIc = Matrixs.zeros(this.numOrder).flatten();
        this.denIc = Matrixs.zeros(this.denOrder).flatten();
    }

    console.log('new TF Made!');
}

function calculateTf(tf,value)
{

    return
}






PolyLib.poly

