/*
MIT License (MIT)
Copyright (c) 2016 Nathan Zimmerman
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

var globalTestObjResults = {};
globalTestObjResults.test = [];
globalTestObjResults.failedTests = 0;
globalTestObjResults.failedTestsObj = [];
globalTestObjResults.testNumber = 0; 

function addTest(testObj)
{
	globalTestObjResults.test.push(testObj);
}

var t1 = {
	testName: 'Add Scalar to Matrix',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]);\r\n\
	A = A.add(1);',
	expectedVal: [[2,3,4],[5,6,7],[8,9,6]]
}
addTest(t1);

var t2 = {
	testName: 'Add Matrix to Matrix',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]);\r\n\
	A = A.add([[4,3,2],[7,6,5],[1,0,3]]);',
	expectedVal: [[5,5,5],[11,11,11],[8,8,8]]
}
addTest(t2);

var t3 = {
	testName: 'Subtract scalar from Matrix',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]);\r\n\
	A = A.subtract(2);',
	expectedVal: [[-1,0,1],[2,3,4],[5,6,3]]
}
addTest(t3);

var t4 = {
	testName: 'Subtract Matrix from Matrix',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]);\r\n\
	A = A.subtract([[1,2,3],[4,5,6],[7,8,6]]);',
	expectedVal: [[0,0,0],[0,0,0],[0,0,-1]]
}
addTest(t4);

var t5 = {
	testName: 'Multiply Matrix by Scalar',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]);\r\n\
	A = A.multiply(2);',
	expectedVal: [[2,4,6],[8,10,12],[14,16,10]]
}
addTest(t5);

var t6 = {
	testName: 'Multiply Matrix by Matrix',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]);\r\n\
	A = A.multiply([[2,2,3],[1,1,1],[3,1,3]]);',
	expectedVal: [[13,7,14],[31,19,35],[37,27,44]]
}
addTest(t6);

var t7 = {
	testName: 'Command Chaining',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]);\r\n\
	A = A.add(5).subtract(2).subtract(4);',
	expectedVal: [[0,1,2],[3,4,5],[6,7,4]]
}
addTest(t7);

var t8 = {
	testName: 'Matrix Transpose',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6]]);\r\n\
	A = A.transpose();',
	expectedVal: [[1,4],[2,5],[3,6]]
}
addTest(t8);

var t9 = {
	testName: 'Matrix Round',
	testString: 'var A = new Matrixs([[1.11,2.22,3.33],[4.44,5.55,6.66],[7.77,8.88,5.99]]);\r\n\
	A = A.round(1);',
	expectedVal: [[1.1, 2.2, 3.3], [4.4, 5.6, 6.7], [7.8, 8.9, 6.0]]
}
addTest(t9);

var t10 = {
	testName: 'Matrix Inversion',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]);\r\n\
	A = A.invert().round(3);',
	expectedVal: [[-1.917, 1.167, -0.250], [1.833, -1.333, 0.500], [-0.250, 0.500, -0.250]],
	note: 'Result was rounded to 3 decimal places.'
}
addTest(t10);

addTest({
	testName: 'Test Matrix Mean',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,9]]);\r\n\
	var A = Matrixs.make(A.mean());\
	',
	expectedVal: [[5]],
});

addTest({
	testName: 'Test Matrix Max',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,9]]);\r\n\
	var A = Matrixs.make(A.max());\
	',
	expectedVal: [[9]],
});

addTest({
	testName: 'Test Matrix Min',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,9]]);\r\n\
	var A = Matrixs.make(A.min());\
	',
	expectedVal: [[1]],
});

addTest({
	testName: 'Test Matrix Sum',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,9]]);\r\n\
	var A = Matrixs.make(A.sum());\
	',
	expectedVal: [[45]],
});

addTest({
	testName: 'Matrix Cat Horizontal',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]);\r\n\
	A = A.catHorizontal([[1],[2],[3]]);',
	expectedVal: [[1,2,3,1], [4,5,6,2], [7,8,5,3]],
});

addTest({
	testName: 'Matrix Cat Vertical',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]);\r\n\
	A = A.catVertical([[1,2,3]]);',
	expectedVal: [[1,2,3], [4,5,6], [7,8,5],[1,2,3]],
});

addTest({
	testName: 'Matrix shape',
	testString: 'var A = new Matrixs([[1,2],[4,5],[7,8]]);\r\n\
	A = Matrixs.make(A.shape());',
	expectedVal: [[3,2]],
});

addTest({
	testName: 'Matrix columns',
	testString: 'var A = new Matrixs([[1,2,3,4],[4,5,5,6],[7,8,7,6]]);\r\n\
	A = A.columns(1,2);',
	expectedVal: [[2,3],[5,5],[8,7]],
});

addTest({
	testName: 'Matrix rows',
	testString: 'var A = new Matrixs([[1,2,3,4],[4,5,5,6],[7,8,7,6]]);\r\n\
	A = A.rows(1,2);',
	expectedVal: [[4,5,5,6],[7,8,7,6]],
});

addTest({
	testName: 'Matrix range',
	testString: 'var A = Matrixs.range(1,3);',
	expectedVal: [[1],[2],[3]],
});

addTest({
	testName: 'Matrix ones',
	testString: 'var A = Matrixs.ones(3,3);',
	expectedVal: [[1,1,1],[1,1,1],[1,1,1]],
});

addTest({
	testName: 'Matrix ident',
	testString: 'var A = Matrixs.ident(3,3);',
	expectedVal: [[1,0,0],[0,1,0],[0,0,1]],
});

addTest({
	testName: 'Least Squares Example',
	testString: 'var X = Matrixs.range(-4,5);\r\n\
	var y = [[-13],[-11],[-9],[-7],[-5],[-3],[-1],[1],[3],[5]];\r\n\
	var A = X.catHorizontal(Matrixs.ones(10,1));\r\n\
	A = A.transpose().multiply(A).invert().multiply(A.transpose()).multiply(y).round(3);\r\n\
	',
	expectedVal: [[2.00],[-5.00]],
	note: 'This tests and solves a over determined system for the following equation: 2*x-5.'
});

addTest({
	testName: 'Least Squares Example 2',
	testString: 'var X = Matrixs.range(-4,5);\r\n\
	var b = [[-13],[-11],[-9],[-7],[-5],[-3],[-1],[1],[3],[5]];\r\n\
	var A = X.catHorizontal(Matrixs.ones(10,1));\r\n\
	A = A.lsq(b).round(3);\r\n\
	',
	expectedVal: [[2.00],[-5.00]],
	note: 'This tests and solves a over determined system for the following equation: 2*x-5.'
});

addTest({
	testName: 'Least Squares Example 3',
	testString: 'var X = Matrixs.range(-4,5);\r\n\
	var b = [[-13],[-11],[-9],[-7],[-5],[-3],[-1],[1],[3],[5]];\r\n\
	var A = X.catHorizontal(Matrixs.ones(10,1));\r\n\
	A = Matrixs.lsq(A,b).round(3);\
	',
	expectedVal: [[2.00],[-5.00]],
	note: 'This tests and solves a over determined system for the following equation: 2*x-5.'
});


addTest({
	testName: 'RMS',
	testString: 'var A = Matrixs.make([-2.5,2.5,-2.5,2.5,-2.5,2.5]);\r\n\
	A = Matrixs.make(A.rms()).round(3);\r\n\
	',
	expectedVal: [[2.5]],
});

addTest({
	testName: 'Matrix Diag',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,9]]);\r\n\
	A = A.diag();',
	expectedVal: [[1,0,0], [0,5,0], [0,0,9]],
});

addTest({
	testName: 'Gauss Newton Test',
	testString: '\
	var X = Matrixs.range(0.1,5).value;\r\n\
	var Y = (new Models.power([2,2])).fnc(X);\r\n\
	var inputObj = {input:X, output:Y};\r\n\
	var modelObj = new Models.power([1,1]);\r\n\
	var resultObj = Solvers.gaussNewton(inputObj,modelObj);\r\n\
	var A = Matrixs.make(resultObj.solution).round(2);\r\n',
	expectedVal : [[2,2]],
});

addTest({
	testName: 'Levenberg Marquadrt Test',
	testString: '\
	var X = Matrixs.range(0.1,5).value;\r\n\
	var Y = (new Models.power([2,2])).fnc(X);\r\n\
	var inputObj = {input:X, output:Y};\r\n\
	var modelObj = new Models.power([1,1]);\r\n\
	var resultObj = Solvers.levenbergMarquardt(inputObj,modelObj);\r\n\
	var A = Matrixs.make(resultObj.solution).round(2);\r\n',
	expectedVal : [[2,2]],
});

addTest({
	testName: 'Bound check test',
	testString: '\
	var X = [0,1,2,6,4,-1,2,-5,10,2,22,-999];\r\n\
	var A = Matrixs.checkBounds(X,0,5);\r\n',
	expectedVal : [[0,0,0,1,0,-1,0,-1,1,0,1,-1]],
});

addTest({
	testName: 'Delete row',
	testString: '\
	var A = new Matrixs([[1,2,3],[4,5,6],[7,8,9]]);\r\n\
	A = A.deleteRow(1)',
	expectedVal : [[1,2,3],[7,8,9]],
});

addTest({
	testName: 'Delete column',
	testString: '\
	var A = new Matrixs([[1,2,3],[4,5,6],[7,8,9]]);\r\n\
	A = A.deleteCol(1);',
	expectedVal : [[1,3],[4,6],[7,9]],
});

addTest({
	testName: 'Matrix zeros',
	testString: '\
	var A = Matrixs.zeros(4,2);',
	expectedVal : [[0,0],[0,0],[0,0],[0,0]],
});

addTest({
	testName: 'Matrix fill',
	testString: '\
	var A = Matrixs.range(8);\r\n\
	A= Matrixs.fill(A,2,4)',
	expectedVal : [[0,1,2,3],[4,5,6,7]],
});

addTest({
	testName: 'Matrix fill2',
	testString: '\
	var A = Matrixs.range(8);\r\n\
	A= A.fill(4,2)',
	expectedVal : [[0,1],[2,3],[4,5],[6,7]],
});

addTest({
	testName: 'Matrix apply',
	testString: '\
	var A = Matrixs.make([[0,1],[2,3]]);\r\n\
	var cosFnc = function(x){return Math.cos(x)};\r\n\
	A= A.apply(cosFnc).round(3);\r\n',
	expectedVal : [[1,0.54],[-0.416,-0.99]],
});

addTest({
	testName: 'Plot Test ',
	testString: '\
	var X = Matrixs.range(100).addNoise(0.9);\r\n\
	var Y = X.multiply(4).add(-20);\r\n\
	Plots.create([Y],{type:"scatter",div:"aPlotDiv"});\r\n\
	var A=[[1]];\r\n',
	expectedVal : [[1]],
	div:'aPlotDiv',
});

addTest({
	testName: 'Divide Test',
	testString: '\
	var A = Matrixs.make([1,1]);\r\n\
	var B = Matrixs.make([4,2]);\r\n\
	var A = Matrixs.divide(A,B);\r\n',
	expectedVal : [[0.25,0.5]],
});


addTest({
	testName: 'Neural Net Test',
	testString: '\
	var xx = new Models.neuralNet();\r\n\
	xx.setInputNumber(2);\r\n\
	xx.setLayerSizes([4]);\r\n\
	xx.setOutputNumber(1);\r\n\
	xx.init();\r\n\
	var inputs = [[0,0],[0,1],[1,0],[1,1]];\r\n\
	var outputs = [[0],[1],[1],[0]];\r\n\
	var inputObjs = {input:inputs,output:outputs};\r\n\
	var resultObj = Solvers.levenbergMarquardt(inputObjs,xx);\r\n\
	var timeEnd = Date.now();\r\n\
	A = Matrixs.make(xx.fnc(inputs)).round(1);\r\n',
	expectedVal : [[0],[1],[1],[0]],
});


addTest({
	testName: 'Lag Test',
	testString: '\
	var A = Matrixs.range(3);\r\n\
	A = A.lag(0,2);',
	expectedVal : [[0,NaN,NaN],[1,0,NaN],[2,1,0]],
});


addTest({
	testName: 'Lag Trim Test',
	testString: '\
	var A = Matrixs.range(5);\r\n\
	A = A.lagTrim(0,2);',
	expectedVal : [[2,1,0],[3,2,1],[4,3,2]],
});

addTest({
	testName: 'Functional Levenberg Marquardt',
	testString: 'function myFunc(x,param){\r\n\
	var X = Matrixs.make(x);\r\n\
	var a = param[0]; var b = param[1]; var c = param[2];\r\n\
	var Y = X.multiply(a).apply(Math.exp).add(X.multiply(c).apply(Math.cos).multiply(b));\r\n\
	return Y.value;}\r\n\
	var X = Matrixs.range(-5,0.05,5);\r\n\
	var Y = Matrixs.make( myFunc( X.value, [-0.5,4,1.5]) ).addNoise(0.01);\r\n\
	var guess = [-1,2,1];\r\n\
	var resultObj = Solvers.levenbergMarquardtFnc(X.value, Y.value, myFunc,guess);\r\n\
	var A = Matrixs.make(resultObj.solution).round(1);\r\n',
	expectedVal : [[-0.5,4,1.5]],

});


addTest({
	testName: 'BVLS Test ',
	testString: '\
	var X = Matrixs.range(0,0.1,10);\r\n\
	var Y = X.multiply(5).add(20).addNoise(0.2);\r\n\
	var A = X.catH(X.pow(0));\r\n\
	var yFit = A.multiply(A.lsq(Y));\r\n\
	var yFitBounded = A.multiply(Solvers.bvls(A,Y,[0,0],[9999,10]).solution);\r\n\
	Plots.create(Y,{type:"scatter",name:"Scatter",div:"aPlotDiv2"});\r\n\
	Plots.add(yFit,{name:"Least Squares Fit",div:"aPlotDiv2"}); \r\n\
	Plots.add(yFitBounded,{name:"Bounded Fit (b<10)",color:"blue",div:"aPlotDiv2"});\r\n', 
	expectedVal : [[1]],
	div:'aPlotDiv2',
});

addTest({
	testName: 'Delete Rows',
	testString: '\
	var A = Matrixs.make([[1,2,3],[4,5,6],[7,8,9],[10,11,12]]);\r\n\
	A = A.deleteRows(0,1);',
	expectedVal : [[7,8,9],[10,11,12]],
});

addTest({
	testName: 'Clone',
	testString: '\
	var A = [[1,2],[3,4]];\r\n\
	var aMatrix = Matrixs.clone(A);\r\n\
	aMatrix.value.pop();\r\n\
	A = Matrixs.make(A);',
	expectedVal : [[1,2],[3,4]],
});

function executeUnitTests()
{
	for(var i = 0; i < globalTestObjResults.test.length; i++)
	{
		var testPassed = false; 
		
		try{ 
			testPassed = runTest(globalTestObjResults.test[i]);
		}
		catch(err)
		{
			console.log(err);
			globalTestObjResults.test[i].testPassed = false; 
			createTestDiv(globalTestObjResults.test[i]);
		}
		
		globalTestObjResults.failedTests += (testPassed) ? 0 : 1;
		if(!testPassed)
		{
			globalTestObjResults.failedTestsObj.push(globalTestObjResults.test[i])
		}
	}
	
	$('#totalTests')[0].innerHTML = '' +globalTestObjResults.test.length;
	$('#totalFailed')[0].innerHTML = '' +globalTestObjResults.failedTests;
	
	if(globalTestObjResults.failedTests)
	{
		$('#testCompletionResult')[0].innerHTML = '<h3>Test(s) Failed!</h3>';
		
		for(var i = 0; i < globalTestObjResults.failedTestsObj.length; i++)
		{
			$('#testResults')[0].innerHTML += 'Failed: ' + globalTestObjResults.failedTestsObj[i].testName +'</br> </br>';  
		}
		
	}
	else
	{
		$('#testCompletionResult')[0].innerHTML = '<h2>Tests Passed!</h2>';
		
	}
}
executeUnitTests();

function runTest(testObj)
{
	testObj.testStrings = testObj.testString.replace(/(?:\r\n|\r|\n)/g, '<br />');
	if((typeof testObj.div) == 'undefined')
	{
		eval(testObj.testString);

		if(A.value.equals(testObj.expectedVal))
		{
			testObj.testPassed = true; 
		}
		else
		{
			testObj.testPassed = false; 
		}
		testObj.calcText = A.print().replace(/(?:\r\n|\r|\n)/g, '<br />');
		var B = new Matrixs(testObj.expectedVal);
		testObj.resultText = B.print().replace(/(?:\r\n|\r|\n)/g, '<br />');

	}
	else
	{
		testObj.calcText ='';
		testObj.resultText = '';
		testObj.testPassed = true;

	}
	
	
	createTestDiv(testObj);
	return testObj.testPassed;
}



function createTestDiv(testObj)
{	
	var testsNumber = $('.testSection').length; 
	var iDiv = document.createElement('div');
	iDiv.id = 'testDiv' +testsNumber;
	iDiv.className = 'testSection'; 
	iDiv.innerHTML ='<h1>'+testObj.testName+'</h1>';
	iDiv.innerHTML+='<b>Test String:</b></br>';
	iDiv.innerHTML+= '<div class ="codeText">'+ testObj.testStrings +'</div></br>';
	iDiv.innerHTML+='<b>Expected:</b></br>';
	iDiv.innerHTML+='<div class="matrixPrint">'+testObj.resultText+'</div></br>';
	iDiv.innerHTML+='<b>Calculated:</b></br>';
	iDiv.innerHTML+='<div class="matrixPrint">'+testObj.calcText+'</div>';
	
	if((typeof testObj.note) != 'undefined')
	{
		iDiv.innerHTML+='</br><b>Note: </b>'+testObj.note+'</br>'
	}

	if((typeof testObj.div) != 'undefined')
	{
		iDiv.innerHTML+='<div id="'+testObj.div+'" style=" width:500px; height:250px; display:block;"></div>'
	}

	
	if(testObj.testPassed)
	{
		iDiv.innerHTML+='<h2>Test Passed!</h2>';
		iDiv.style.backgroundColor = 'rgba(0,150,0,0.1)';
		iDiv.style.boxShadow = '0px 0px 10px rgba(0,150,0,0.5)';
	}
	else
	{
		iDiv.innerHTML+='<h3>Test Failed!</h3>';
		iDiv.style.backgroundColor = 'rgba(255,0,0,0.1)';
		iDiv.style.boxShadow = '0px 0px 10px rgba(255,0,0,0.5)';
	}
	$('#content')[0].appendChild(iDiv);	

	if((typeof testObj.div) != 'undefined')
	{
		eval(testObj.testString);
	}


}

