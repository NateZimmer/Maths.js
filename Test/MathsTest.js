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
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); A = A.add(1);',
	expectedVal: [[2,3,4],[5,6,7],[8,9,6]]
}
addTest(t1);

var t2 = {
	testName: 'Add Matrix to Matrix',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); A = A.add([[4,3,2],[7,6,5],[1,0,3]]);',
	expectedVal: [[5,5,5],[11,11,11],[8,8,8]]
}
addTest(t2);

var t3 = {
	testName: 'Subtract scalar from Matrix',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); \
	A = A.subtract(2);',
	expectedVal: [[-1,0,1],[2,3,4],[5,6,3]]
}
addTest(t3);

var t4 = {
	testName: 'Subtract Matrix from Matrix',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); \
	A = A.subtract([[1,2,3],[4,5,6],[7,8,6]]);',
	expectedVal: [[0,0,0],[0,0,0],[0,0,-1]]
}
addTest(t4);

var t5 = {
	testName: 'Multiply Matrix by Scalar',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); \
	A = A.multiply(2);',
	expectedVal: [[2,4,6],[8,10,12],[14,16,10]]
}
addTest(t5);

var t6 = {
	testName: 'Multiply Matrix by Matrix',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); \
	A = A.multiply([[2,2,3],[1,1,1],[3,1,3]]);',
	expectedVal: [[13,7,14],[31,19,35],[37,27,44]]
}
addTest(t6);

var t7 = {
	testName: 'Command Chaining',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); \
	A = A.add(5).subtract(2).subtract(4);',
	expectedVal: [[0,1,2],[3,4,5],[6,7,4]]
}
addTest(t7);

var t8 = {
	testName: 'Matrix Transpose',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6]]); \
	A = A.transpose();',
	expectedVal: [[1,4],[2,5],[3,6]]
}
addTest(t8);

var t9 = {
	testName: 'Matrix Round',
	testString: 'var A = new Matrixs([[1.11,2.22,3.33],[4.44,5.55,6.66],[7.77,8.88,5.99]]); \
	A = A.round(1);',
	expectedVal: [[1.1, 2.2, 3.3], [4.4, 5.6, 6.7], [7.8, 8.9, 6.0]]
}
addTest(t9);

var t10 = {
	testName: 'Matrix Inversion',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); \
	A = A.invert().round(3);',
	expectedVal: [[-1.917, 1.167, -0.250], [1.833, -1.333, 0.500], [-0.250, 0.500, -0.250]],
	note: 'Result was rounded to 3 decimal places.'
}
addTest(t10);

addTest({
	testName: 'Matrix Cat Horizontal',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); \
	A = A.catHorizontal([[1],[2],[3]]);',
	expectedVal: [[1,2,3,1], [4,5,6,2], [7,8,5,3]],
	note: 'Result was rounded to 3 decimal places.'
});

addTest({
	testName: 'Matrix Cat Vertical',
	testString: 'var A = new Matrixs([[1,2,3],[4,5,6],[7,8,5]]); \
	A = A.catVertical([[1,2,3]]);',
	expectedVal: [[1,2,3], [4,5,6], [7,8,5],[1,2,3]],
	note: 'Result was rounded to 3 decimal places.'
});

addTest({
	testName: 'Least Squares Example',
	testString: 'var X = Matrixs.range(-4,5); \
	var y = [[-13],[-11],[-9],[-7],[-5],[-3],[-1],[1],[3],[5]]; \
	var A = X.catHorizontal(Matrixs.ones(10,1));\
	A = A.transpose().multiply(A).invert().multiply(A.transpose()).multiply(y).round(3);\
	',
	expectedVal: [[2.00],[-5.00]],
	note: 'This tests and solves a over determined system for the following equation: 2*x-5.'
});

addTest({
	testName: 'Least Squares Example 2',
	testString: 'var X = Matrixs.range(-4,5); \
	var b = [[-13],[-11],[-9],[-7],[-5],[-3],[-1],[1],[3],[5]]; \
	var A = X.catHorizontal(Matrixs.ones(10,1));\
	A = A.lsq(b).round(3);\
	',
	expectedVal: [[2.00],[-5.00]],
	note: 'This tests and solves a over determined system for the following equation: 2*x-5.'
});

addTest({
	testName: 'Least Squares Example 3',
	testString: 'var X = Matrixs.range(-4,5); \
	var b = [[-13],[-11],[-9],[-7],[-5],[-3],[-1],[1],[3],[5]]; \
	var A = X.catHorizontal(Matrixs.ones(10,1));\
	A = Matrixs.lsq(A,b).round(3);\
	',
	expectedVal: [[2.00],[-5.00]],
	note: 'This tests and solves a over determined system for the following equation: 2*x-5.'
});


function executeUnitTests()
{
	for(var i = 0; i < globalTestObjResults.test.length; i++)
	{
		var testPassed = runTest(globalTestObjResults.test[i]);
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
	eval(testObj.testString);
	if(A.value.equals(testObj.expectedVal))
	{
		testObj.testPassed = true; 
	}
	else
	{
		testObj.testPassed = false; 
	}
	
	testObj.calcText = A.print().replace(/(?:\r\n|\r|\n)/g, '<br />');;
	
	var B = new Matrixs(testObj.expectedVal);
	testObj.resultText = B.print().replace(/(?:\r\n|\r|\n)/g, '<br />');;
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
	iDiv.innerHTML+= '<div class ="codeText">'+testObj.testString +'</div></br>';
	iDiv.innerHTML+='<b>Expected:</b></br>';
	iDiv.innerHTML+='<div class="matrixPrint">'+testObj.resultText+'</div></br>';
	iDiv.innerHTML+='<b>Calculated:</b></br>';
	iDiv.innerHTML+='<div class="matrixPrint">'+testObj.calcText+'</div>';
	
	if((typeof testObj.note) != 'undefined')
	{
		iDiv.innerHTML+='</br><b>Note: </b>'+testObj.note+'</br>'
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
}

